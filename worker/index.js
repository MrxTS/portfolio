/**
 * Assets-Worker mit einer einzigen dynamischen Route.
 *
 * `/data/pulse.json` liefert die Aggregate aus dem Homelab, sofern der
 * KV-Namespace gebunden ist. Ist er es nicht, oder steht dort nichts, fällt die
 * Antwort auf die statische Datei aus `dist/` zurück. Die Seite kommt mit
 * beidem klar: sie zeigt immer das Alter des Standes, den sie bekommen hat.
 *
 * Damit dieser Worker läuft, muss wrangler.jsonc erweitert werden — siehe
 * docs/live-daten.md. Ohne diese Erweiterung bleibt die Site ein reiner
 * Assets-Worker und diese Datei ist tot, aber unschädlich.
 */
export default {
  async fetch(request, env) {
    const url = new URL(request.url);

    if (url.pathname === "/data/pulse.json") {
      try {
        const value = env.PULSE ? await env.PULSE.get("pulse") : null;
        if (value) {
          return new Response(value, {
            headers: {
              "content-type": "application/json; charset=utf-8",
              // Kürzer als das Push-Intervall, damit der Zeitstempel nicht
              // älter aussieht als er ist.
              "cache-control": "public, max-age=60",
            },
          });
        }
      } catch {
        // KV nicht erreichbar: still auf die statische Datei zurückfallen.
        // Ein 500 hier würde die Marginalie leeren, obwohl ein alter, aber
        // ehrlicher Stand verfügbar ist.
      }
    }

    return env.ASSETS.fetch(request);
  },
};
