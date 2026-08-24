# Live-Daten für die Marginalie

Die Randspalte der Startseite trägt echte Aggregate aus dem Homelab-Cluster.
Diese Datei beschreibt, wie sie dorthin kommen.

## Warum Push und nicht Abruf

Das Homelab öffnet keinen Port und exponiert keinen Endpoint. Ein Cron im
Cluster sammelt alle fünf Minuten ein paar Zahlen und legt sie in Cloudflare KV
ab. Der Worker liest KV, das Homelab wird nie von außen angesprochen.

Fällt der Cluster aus, altert der Zeitstempel auf der Seite sichtbar. Das ist
gewollt: eine Seite, die nach einem Ausfall weiter frische Zahlen behauptet,
wäre schlechter als eine, die zugibt, dass der letzte Stand acht Stunden alt
ist.

## Was rausgeht

Ausschließlich Zahlen:

| Feld | Bedeutung |
|---|---|
| `nodes` | Anzahl Proxmox-Knoten, die geantwortet haben |
| `containers_running` / `containers_total` | LXCs über alle Knoten |
| `vms` | virtuelle Maschinen |
| `node_boot_oldest` / `node_boot_newest` | Bootzeitpunkte, ISO 8601 |
| `backup_guests` | Anzahl Gäste mit mindestens einem Snapshot |
| `backup_snapshots` | Snapshots insgesamt |
| `backup_newest` | jüngster Snapshot, ISO 8601 |
| `generated` | Zeitpunkt der Erhebung, ISO 8601 |

**Was nie dazukommt:** IP-Adressen, Hostnamen, Container- oder Dienstnamen,
Pfade, Versionsstände. Wer das Feld-Set erweitert, prüft diese Zeile zuerst.

## Einrichtung

Zwei Schritte, beide brauchen Zugriff auf den Cloudflare-Account.

### 1. KV-Namespace anlegen

```bash
npx wrangler kv namespace create PULSE
```

Der Befehl gibt eine `id` aus. Diese in `wrangler.jsonc` eintragen, zusammen
mit dem Worker-Einstieg und der Assets-Bindung:

```jsonc
{
  "$schema": "./node_modules/wrangler/config-schema.json",
  "name": "portfolio",
  "compatibility_date": "2026-08-22",
  "main": "./worker/index.js",
  "assets": {
    "directory": "./dist",
    "binding": "ASSETS"
  },
  "kv_namespaces": [
    { "binding": "PULSE", "id": "<hier die ausgegebene id>" }
  ]
}
```

Die Datei liegt bewusst noch **ohne** diese Erweiterung im Repo: eine
`kv_namespaces`-Bindung mit Platzhalter-ID bricht das Deployment, und ein
kaputtes Deployment ist teurer als eine Marginalie, die vorerst den
eingebackenen Stand zeigt.

### 2. Token und Cron im Cluster

API-Token in Cloudflare erzeugen mit **Workers KV Storage: Edit**, beschränkt
auf diesen Namespace. Dann auf MS-01:

```bash
install -m 700 tools/collect-pulse.sh /usr/local/bin/collect-pulse.sh
```

Zugangsdaten nach `/etc/default/pulse`, `chmod 600`:

```sh
CF_ACCOUNT_ID=…
CF_KV_NAMESPACE_ID=…
CF_KV_TOKEN=…
```

Einmalig davor: MS-01 muss den zweiten Knoten kontaktieren koennen. Ohne das
bricht der Abruf nicht ab, sondern zaehlt den zweiten Knoten als 0, und die
Seite zeigt dann 18 statt 32 Container. Das faellt nur auf, wenn man die Zahl
kennt, deshalb steht es hier:

```bash
ssh root@192.168.178.2
ssh-keygen -t ed25519 -N '' -f ~/.ssh/id_ed25519      # falls noch keiner da ist
ssh-copy-id root@192.168.178.3                        # akzeptiert zugleich den Hostkey
ssh -n root@192.168.178.3 'pct list | tail -n +2 | wc -l'   # muss eine Zahl liefern
```

Cron:

```cron
*/5 * * * * . /etc/default/pulse && /usr/local/bin/collect-pulse.sh >/dev/null 2>&1
```

Ohne gesetztes `CF_KV_TOKEN` schreibt das Skript das JSON auf stdout, statt zu
pushen. So lässt sich die Ausgabe prüfen, bevor irgendetwas rausgeht:

```bash
ssh root@192.168.178.2 /usr/local/bin/collect-pulse.sh
```

## Verhalten ohne KV

`public/data/pulse.json` liegt als statischer Stand im Repo. Solange KV nicht
eingerichtet ist, liest die Seite diese Datei und zeigt deren Alter. Zusätzlich
trägt die Seite einen eingebackenen Stand im Skript: schlägt selbst der Abruf
der statischen Datei fehl, erscheinen die Zahlen mit dem Hinweis
„Abruf fehlgeschlagen“ statt gar nicht.

Es gibt an keiner Stelle einen Platzhalterwert. Jede angezeigte Zahl war
irgendwann eine Messung.
