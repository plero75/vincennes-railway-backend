
// =====================================================
// 🌐 constants.js – Dashboard Hippodrome de Vincennes
// =====================================================

export const PROXY_URL =
  "https://ratp-proxy.hippodrome-proxy42.workers.dev/?url=";

export function primUrl(path, params) {
  const base = "https://prim.iledefrance-mobilites.fr" + path;
  const qs = new URLSearchParams(params).toString();
  return PROXY_URL + encodeURIComponent(`${base}?${qs}`);
}

export const LINE_REFS = {
  RERA: "STIF:Line::C01742:",
  BUS_77: "STIF:Line::C02251:",
  BUS_201: "STIF:Line::C01219:",
  BUS_108: "STIF:Line::C01137:",
  BUS_110: "STIF:Line::C01139:",
  BUS_101: "STIF:Line::C01130:",
  BUS_281: "STIF:Line::C01260:",
  N33: "STIF:Line::C01399:",
  N34: "STIF:Line::C01400:",
  BUS_520: "STIF:Line::C02270:",
  BUS_112: "STIF:Line::C01135:",
  N71: "STIF:Line::C01501:",
};

export const STOPS = {
  JOINVILLE_RER: {
    RERA: ["STIF:StopPoint:Q:22452:", "STIF:StopPoint:Q:22453:"],
    BUS_77: ["STIF:StopPoint:Q:39406:"],
    BUS_201: ["STIF:StopPoint:Q:39406:"],
    BUS_108: ["STIF:StopPoint:Q:39407:"],
    BUS_110: ["STIF:StopPoint:Q:39407:"],
    BUS_101: ["STIF:StopPoint:Q:39407:"],
    BUS_281: ["STIF:StopPoint:Q:39407:"],
    N33: ["STIF:StopPoint:Q:39406:"],
    N34: ["STIF:StopPoint:Q:39408:"],
    BUS_520: ["STIF:StopPoint:Q:39409:"],
  },
  ECOLE_DU_BREUIL: {
    BUS_77: ["STIF:StopPoint:Q:463644:"],
    BUS_201: ["STIF:StopPoint:Q:463644:"],
    N33: ["STIF:StopPoint:Q:463644:"],
  },
  HIPPODROME_VINCENNES: {
    BUS_77: ["STIF:StopPoint:Q:463641:"],
    BUS_112: ["STIF:StopPoint:Q:463641:"],
    N33: ["STIF:StopPoint:Q:463641:"],
    N71: ["STIF:StopPoint:Q:463641:"],
  },
};

export const URLS = {
  JOINVILLE: {
    RERA_PARIS: primUrl("/marketplace/stop-monitoring", {
      MonitoringRef: STOPS.JOINVILLE_RER.RERA[0],
      LineRef: LINE_REFS.RERA,
    }),
    RERA_BOISSY: primUrl("/marketplace/stop-monitoring", {
      MonitoringRef: STOPS.JOINVILLE_RER.RERA[1],
      LineRef: LINE_REFS.RERA,
    }),
    BUS_77: primUrl("/marketplace/stop-monitoring", {
      MonitoringRef: STOPS.JOINVILLE_RER.BUS_77[0],
      LineRef: LINE_REFS.BUS_77,
    }),
    BUS_201: primUrl("/marketplace/stop-monitoring", {
      MonitoringRef: STOPS.JOINVILLE_RER.BUS_201[0],
      LineRef: LINE_REFS.BUS_201,
    }),
    BUS_108: primUrl("/marketplace/stop-monitoring", {
      MonitoringRef: STOPS.JOINVILLE_RER.BUS_108[0],
      LineRef: LINE_REFS.BUS_108,
    }),
    BUS_110: primUrl("/marketplace/stop-monitoring", {
      MonitoringRef: STOPS.JOINVILLE_RER.BUS_110[0],
      LineRef: LINE_REFS.BUS_110,
    }),
    BUS_101: primUrl("/marketplace/stop-monitoring", {
      MonitoringRef: STOPS.JOINVILLE_RER.BUS_101[0],
      LineRef: LINE_REFS.BUS_101,
    }),
    BUS_281: primUrl("/marketplace/stop-monitoring", {
      MonitoringRef: STOPS.JOINVILLE_RER.BUS_281[0],
      LineRef: LINE_REFS.BUS_281,
    }),
    N33: primUrl("/marketplace/stop-monitoring", {
      MonitoringRef: STOPS.JOINVILLE_RER.N33[0],
      LineRef: LINE_REFS.N33,
    }),
    N34: primUrl("/marketplace/stop-monitoring", {
      MonitoringRef: STOPS.JOINVILLE_RER.N34[0],
      LineRef: LINE_REFS.N34,
    }),
    BUS_520: primUrl("/marketplace/stop-monitoring", {
      MonitoringRef: STOPS.JOINVILLE_RER.BUS_520[0],
      LineRef: LINE_REFS.BUS_520,
    }),
  },
  ECOLE_DU_BREUIL: {
    BUS_77: primUrl("/marketplace/stop-monitoring", {
      MonitoringRef: STOPS.ECOLE_DU_BREUIL.BUS_77[0],
      LineRef: LINE_REFS.BUS_77,
    }),
    BUS_201: primUrl("/marketplace/stop-monitoring", {
      MonitoringRef: STOPS.ECOLE_DU_BREUIL.BUS_201[0],
      LineRef: LINE_REFS.BUS_201,
    }),
    N33: primUrl("/marketplace/stop-monitoring", {
      MonitoringRef: STOPS.ECOLE_DU_BREUIL.N33[0],
      LineRef: LINE_REFS.N33,
    }),
  },
  HIPPODROME_VINCENNES: {
    BUS_77: primUrl("/marketplace/stop-monitoring", {
      MonitoringRef: STOPS.HIPPODROME_VINCENNES.BUS_77[0],
      LineRef: LINE_REFS.BUS_77,
    }),
    BUS_112: primUrl("/marketplace/stop-monitoring", {
      MonitoringRef: STOPS.HIPPODROME_VINCENNES.BUS_112[0],
      LineRef: LINE_REFS.BUS_112,
    }),
    N33: primUrl("/marketplace/stop-monitoring", {
      MonitoringRef: STOPS.HIPPODROME_VINCENNES.N33[0],
      LineRef: LINE_REFS.N33,
    }),
    N71: primUrl("/marketplace/stop-monitoring", {
      MonitoringRef: STOPS.HIPPODROME_VINCENNES.N71[0],
      LineRef: LINE_REFS.N71,
    }),
  },
};

export const TRAFFIC = Object.fromEntries(
  Object.entries(LINE_REFS).map(([key, ref]) => [
    key,
    primUrl("/marketplace/general-message", { LineRef: ref }),
  ])
);

export const WEATHER_URL = "https://api.open-meteo.com/v1/forecast";
export const WEATHER_PARAMS = {
  latitude: 48.817,
  longitude: 2.454,
  current_weather: "true",
  timezone: "Europe/Paris",
};

export const NEWS_FEED_URL = "https://www.francetvinfo.fr/titres.rss";
export const NEWS_FEED_BACKUP = "https://www.lemonde.fr/rss/une.xml";

export const SYTADIN_URL =
  "https://www.sytadin.fr/sys/barometres_trafic_courant_courbes_c.json";

export const RACES_JSON_URL = "./data/races.json";

export const VELIB_STATION_IDS = {
  VINCENNES: 12163,
  BREUIL: 12128,
};

export const VELIB_STATION_NAMES = {
  [VELIB_STATION_IDS.VINCENNES]: "Hippodrome de Vincennes",
  [VELIB_STATION_IDS.BREUIL]: "École du Breuil / Pyramides",
};

export const REFRESH_INTERVALS = {
  RER: 30000,
  BUS: 45000,
  TRAFFIC: 120000,
  METEO: 300000,
  VELIB: 60000,
  NEWS: 180000,
};

export function withProxy(url) {
  return PROXY_URL + encodeURIComponent(url);
}

export const API_ENDPOINTS = {
  ...URLS.JOINVILLE,
  ...URLS.ECOLE_DU_BREUIL,
  ...URLS.HIPPODROME_VINCENNES,
};

export const ITINERARY_CONSTANTS = {
  MAX_STOPS: 20,
  LINES: {
    RER_A: LINE_REFS.RERA,
    BUS_77: LINE_REFS.BUS_77,
    BUS_201: LINE_REFS.BUS_201,
  },
  MAIN_STOPS: {
    JOINVILLE: [
      "Joinville-le-Pont",
      "Champigny",
      "Saint-Maur–Créteil",
      "Nogent-sur-Marne",
      "Vincennes",
      "Nation",
    ],
    VINCENNES: [
      "Hippodrome de Vincennes",
      "École du Breuil",
      "Château de Vincennes",
      "Joinville-le-Pont",
    ],
  },
};

export const TRANSPORT_CONFIG = {
  JOINVILLE: {
    label: "Joinville-le-Pont RER",
    lines: {
      RERA: LINE_REFS.RERA,
      BUS_77: LINE_REFS.BUS_77,
      BUS_201: LINE_REFS.BUS_201,
      BUS_108: LINE_REFS.BUS_108,
      BUS_110: LINE_REFS.BUS_110,
      BUS_101: LINE_REFS.BUS_101,
      BUS_281: LINE_REFS.BUS_281,
      N33: LINE_REFS.N33,
      N34: LINE_REFS.N34,
      BUS_520: LINE_REFS.BUS_520,
    },
  },
  ECOLE_DU_BREUIL: {
    label: "École du Breuil / Pyramides",
    lines: {
      BUS_77: LINE_REFS.BUS_77,
      BUS_201: LINE_REFS.BUS_201,
      N33: LINE_REFS.N33,
    },
  },
  HIPPODROME_VINCENNES: {
    label: "Hippodrome de Vincennes",
    lines: {
      BUS_77: LINE_REFS.BUS_77,
      BUS_112: LINE_REFS.BUS_112,
      N33: LINE_REFS.N33,
      N71: LINE_REFS.N71,
    },
  },
};
