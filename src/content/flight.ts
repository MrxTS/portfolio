/**
 * Der Text des Flugs, zweisprachig.
 *
 * Alles, was auf der Startseite steht, steht hier — die Komponente enthält
 * keine Zeichenkette. Reihenfolge und Fenster der Copy-Blöcke gehören zur
 * Mechanik und stehen in Flight.astro.
 */

export type Lang = "de" | "en";

export interface Waypoint {
  /** Angezeigter Name in der Karte. */
  name: string;
  /** Startposition des Beins in Viewport-Höhen, als Tiefenanzeige. */
  depth: string;
}

export interface FlightCopy {
  htmlLang: string;
  /** Für Zahlenformatierung in der Anfrage-Tafel. */
  locale: string;
  meta: { title: string; description: string };
  waypoints: Waypoint[];
  depthLabel: string;
  mapLabel: string;
  hero: { kicker: string; heading: string; body: string };
  rack: { heading: string; body: string };
  peak: {
    heading: string;
    body: string;
    rows: { nodes: string; containers: string; vms: string; snapshots: string };
    /** "32 von 32" beziehungsweise "32 of 32". */
    ofWord: string;
    waiting: string;
    /** Teile der Herkunftszeile; die Zeitspanne kommt dazwischen. */
    sourceBefore: string;
    sourceAfter: string;
    minutes: string;
    hours: string;
    timeout: string;
    failed: string;
  };
  net: { heading: string; body: string };
  close: {
    heading: string;
    mail: string;
    projectsLabel: string;
    projects: { label: string; href: string }[];
    links: { label: string; href: string }[];
  };
  /** Sprachumschalter. */
  otherLang: { label: string; href: string; hreflang: string };
}

const projectsDe = [
  { label: "Homelab", href: "/projects/homelab" },
  { label: "Forge", href: "/projects/forge" },
  { label: "Sproutly", href: "/projects/sproutly" },
];

const links = [
  { label: "GitHub", href: "https://github.com/MrxTS" },
  { label: "LinkedIn", href: "https://www.linkedin.com/in/stefan-nguyen-025776135/" },
];

export const flight: Record<Lang, FlightCopy> = {
  de: {
    htmlLang: "de",
    locale: "de-DE",
    meta: {
      title: "Stefan Nguyen — Es steht in der Ecke und läuft",
      description:
        "Ein Proxmox-Cluster in einer Wohnung. Vier Geräte, zweiunddreißig Container. Die Zahlen auf dieser Seite fragt sie sich selbst.",
    },
    waypoints: [
      { name: "Oberfläche", depth: "0,0" },
      { name: "Das Rack", depth: "1,5" },
      { name: "Das Blech", depth: "3,0" },
      { name: "Maschinenraum", depth: "4,5" },
      { name: "Das Netz", depth: "7,5" },
      { name: "Ankunft", depth: "9,0" },
    ],
    depthLabel: "Tiefe",
    mapLabel: "Wegpunkte",
    hero: {
      kicker: "Stefan Nguyen",
      heading: "Es steht in der Ecke und läuft.",
      body: "Ein Proxmox-Cluster in einer Wohnung. Vier Geräte, zweiunddreißig Container, kein Rechenzentrum.",
    },
    rack: {
      heading: "Vier Geräte, die sich<br>gegenseitig auffangen.",
      body: "Ein MS-01 als Hauptknoten, ein ausgemusterter ThinkPad als zweiter, ein Raspberry Pi für den DNS, ein NAS für die kalten Kopien. Fällt einer aus, übernehmen die anderen.",
    },
    peak: {
      heading: "Frag es selbst.",
      body: "Diese Seite hat keine gespeicherten Zahlen. An dieser Stelle fragt sie den Cluster. Was hier steht, ist so alt wie die Millisekunden daneben.",
      rows: {
        nodes: "Knoten online",
        containers: "Container laufend",
        vms: "Virtuelle Maschinen",
        snapshots: "Backup-Snapshots",
      },
      ofWord: "von",
      waiting: "Warte auf Antwort.",
      sourceBefore: "Stand vom Cluster, erhoben vor ",
      sourceAfter: ". Kein eingehender Port: der Cluster schiebt, die Seite holt ab.",
      minutes: "Minuten",
      hours: "Stunden",
      timeout:
        "Keine Antwort in acht Sekunden. Der Cluster ist gerade nicht erreichbar, und das steht hier so.",
      failed: "Anfrage fehlgeschlagen: ",
    },
    net: {
      heading: "Es hört nicht an der<br>Wohnungstür auf.",
      body: "Was hier steht, ist nicht ein Rechner, sondern mehrere, die sich als einer verhalten. Ein Mesh-VPN nimmt die Geräte unterwegs dazu, ein eigener Resolver antwortet innen wie außen, und nachts schreibt der Backup-Server auf zwei getrennte Speicher.",
    },
    close: {
      heading: "Schreib mir.",
      mail: "stng.dev@proton.me",
      projectsLabel: "Was sonst noch hier steht",
      projects: projectsDe,
      links,
    },
    otherLang: { label: "English", href: "/en/", hreflang: "en" },
  },

  en: {
    htmlLang: "en",
    locale: "en-GB",
    meta: {
      title: "Stefan Nguyen — It sits in the corner and runs",
      description:
        "A Proxmox cluster in a flat. Four machines, thirty-two containers. This page asks itself for the numbers.",
    },
    waypoints: [
      { name: "Surface", depth: "0.0" },
      { name: "The rack", depth: "1.5" },
      { name: "The metal", depth: "3.0" },
      { name: "Machine room", depth: "4.5" },
      { name: "The network", depth: "7.5" },
      { name: "Arrival", depth: "9.0" },
    ],
    depthLabel: "Depth",
    mapLabel: "Waypoints",
    hero: {
      kicker: "Stefan Nguyen",
      heading: "It sits in the corner and runs.",
      body: "A Proxmox cluster in a flat. Four machines, thirty-two containers, no data centre.",
    },
    rack: {
      heading: "Four machines that<br>catch each other.",
      body: "An MS-01 as the main node, a retired ThinkPad as the second, a Raspberry Pi for DNS, a NAS for the cold copies. If one drops out, the others take over.",
    },
    peak: {
      heading: "Ask it yourself.",
      body: "This page has no stored numbers. At this point it asks the cluster. What you read here is as old as the milliseconds beside it.",
      rows: {
        nodes: "Nodes online",
        containers: "Containers running",
        vms: "Virtual machines",
        snapshots: "Backup snapshots",
      },
      ofWord: "of",
      waiting: "Waiting for a reply.",
      sourceBefore: "Cluster reading, taken ",
      sourceAfter: " ago. No inbound port: the cluster pushes, the page collects.",
      minutes: "minutes",
      hours: "hours",
      timeout:
        "No reply in eight seconds. The cluster is unreachable right now, and that is what it says here.",
      failed: "Request failed: ",
    },
    net: {
      heading: "It does not stop at<br>the front door.",
      body: "What you are looking at is not one computer but several behaving as one. A mesh VPN brings in the devices that leave the flat, a private resolver answers inside and out, and at night the backup server writes to two separate stores.",
    },
    close: {
      heading: "Write to me.",
      mail: "stng.dev@proton.me",
      projectsLabel: "What else is here",
      projects: projectsDe,
      links,
    },
    otherLang: { label: "Deutsch", href: "/", hreflang: "de" },
  },
};
