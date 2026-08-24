#!/usr/bin/env bash
# Sammelt die Aggregate für die lebende Marginalie auf portfolio.stng.dev und
# schiebt sie nach Cloudflare KV.
#
# Läuft auf MS-01 als Cron, alle fünf Minuten. Ausgehend, nie eingehend:
# das Homelab öffnet keinen Port und exponiert keinen Endpoint.
#
#   */5 * * * * /usr/local/bin/collect-pulse.sh >/dev/null 2>&1
#
# Erwartete Umgebung (z.B. /etc/default/pulse, chmod 600):
#   CF_ACCOUNT_ID, CF_KV_NAMESPACE_ID, CF_KV_TOKEN
#
# Was hier NICHT rausgeht und auch nie hinzugefügt werden darf: IP-Adressen,
# Hostnamen, Container- oder Dienstnamen, Pfade, Versionsstände. Nur Zahlen.
set -euo pipefail

P52S_HOST="${P52S_HOST:-192.168.178.3}"

iso() { date -u -d "@$1" +%Y-%m-%dT%H:%M:%SZ; }

# ── lokaler Knoten ──────────────────────────────────────────────────────────
local_ct_running=$(pct list | tail -n +2 | grep -c running || echo 0)
local_ct_total=$(pct list | tail -n +2 | wc -l)
local_vms=$(qm list | tail -n +2 | wc -l)
local_boot=$(( $(date +%s) - $(cut -d. -f1 /proc/uptime) ))

# ── zweiter Knoten ──────────────────────────────────────────────────────────
# Fällt er aus, zählt er als 0 statt das Skript abzubrechen: eine ehrliche
# kleinere Zahl ist besser als ein eingefrorener Stand.
# -n ist Pflicht, nicht Kosmetik: ohne das liest ssh stdin leer und frisst,
# wenn dieses Skript selbst über stdin ankommt (bash -s), seinen eigenen Rest.
remote=$(ssh -n -o BatchMode=yes -o ConnectTimeout=8 "root@${P52S_HOST}" \
  'echo "$(pct list | tail -n +2 | grep -c running) $(pct list | tail -n +2 | wc -l) $(( $(date +%s) - $(cut -d. -f1 /proc/uptime) ))"' \
  2>/dev/null || echo "0 0 0")
read -r remote_running remote_total remote_boot <<<"$remote"

nodes=1
[ "$remote_total" -gt 0 ] && nodes=2

boot_oldest=$local_boot
boot_newest=$local_boot
if [ "$remote_boot" -gt 0 ]; then
  [ "$remote_boot" -lt "$boot_oldest" ] && boot_oldest=$remote_boot
  [ "$remote_boot" -gt "$boot_newest" ] && boot_newest=$remote_boot
fi

# ── Backups ─────────────────────────────────────────────────────────────────
backups=$(pvesm list pbs --content backup 2>/dev/null | tail -n +2 || true)
snapshots=$(printf '%s\n' "$backups" | grep -c . || echo 0)
guests=$(printf '%s\n' "$backups" | awk '{print $1}' | grep -oP '(ct|vm)/\d+' | sort -u | wc -l)
# Kein `head` hinter dem `sort`: head beendet sich nach der ersten Zeile, sort
# bekommt SIGPIPE, und zusammen mit `pipefail` reisst das das ganze Skript mit
# (Exitcode 141). Stattdessen vollstaendig einlesen und die erste Zeile schneiden.
stamps=$(printf '%s\n' "$backups" | awk '{print $1}' \
  | grep -oP '\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}Z' | sort -r)
newest=${stamps%%$'\n'*}

payload=$(cat <<EOF
{
  "generated": "$(date -u +%Y-%m-%dT%H:%M:%SZ)",
  "nodes": ${nodes},
  "containers_running": $(( local_ct_running + remote_running )),
  "containers_total": $(( local_ct_total + remote_total )),
  "vms": ${local_vms},
  "node_boot_oldest": "$(iso "$boot_oldest")",
  "node_boot_newest": "$(iso "$boot_newest")",
  "backup_guests": ${guests},
  "backup_snapshots": ${snapshots},
  "backup_newest": "${newest:-}"
}
EOF
)

if [ -n "${CF_KV_TOKEN:-}" ]; then
  curl -sf -X PUT \
    "https://api.cloudflare.com/client/v4/accounts/${CF_ACCOUNT_ID}/storage/kv/namespaces/${CF_KV_NAMESPACE_ID}/values/pulse" \
    -H "Authorization: Bearer ${CF_KV_TOKEN}" \
    -F "value=${payload}" \
    -F 'metadata={}' >/dev/null
else
  printf '%s\n' "$payload"
fi
