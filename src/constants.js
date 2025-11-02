// =====================================================
// 🌐 constants.js — Dashboard Vincennes (référentiel IDFM validé 2025-11-02)
// =====================================================

// ---------------------------------------------
// 🔐 Proxy Cloudflare (clé API IDFM gérée côté Worker)
// ---------------------------------------------
export const PROXY_URL =
  "https://ratp-proxy.hippodrome-proxy42.workers.dev/?url=";

export function primUrl(path, params) {
  const base = "https://prim.iledefrance-mobilites.fr" + path;
  const qs = new URLSearchParams(params).toString();
  return PROXY_URL + encodeURIComponent(`${base}?${qs}`);
}

// =====================================================
// 🚆 Lignes officielles (LineRef PRIM)
// =====================================================
export const LINE_REFS = {
  RERA: "STIF:Line::A:",
  BUS_77: "STIF:Line::C02251:",
  BUS_201: "STIF:Line::C01219:",
};

// =====================================================
// 🅿️ StopAreas (MonitoringRef / StopAreaRef valides)
// =====================================================
export const STOPS = {
  JOINVILLE_RER: {
    RERA: ["STIF:StopArea:SP:43135:"],
  },
  HIPPODROME_VINCENNES: {
    BUS_77: ["STIF:StopArea:SP:463641:"],
  },
  ECOLE_DU_BREUIL: {
    BUS_201: ["STIF:StopArea:SP:463644:"],
  },
};

// =====================================================
// 🌍 URLs PRIM (temps réel & horaires)
// =====================================================
export const URLS = {
  JOINVILLE_RER: {
    RERA_TR: primUrl("/marketplace/stop-monitoring", {
      MonitoringRef: STOPS.JOINVILLE_RER.RERA[0],
      LineRef: LINE_REFS.RERA,
      MaximumStopVisits: 4,
    }),
    RERA_TH: primUrl("/marketplace/v2/navitia/stop_schedules", {
      stop_area: STOPS.JOINVILLE_RER.RERA[0],
      line: LINE_REFS.RERA,
      data_freshness: "base_schedule",
    }),
  },

  HIPPODROME_VINCENNES: {
    BUS_77_TR: primUrl("/marketplace/stop-monitoring", {
      MonitoringRef: STOPS.HIPPODROME_VINCENNES.BUS_77[0],
      LineRef: LINE_REFS.BUS_77,
      MaximumStopVisits: 4,
    }),
    BUS_77_TH: primUrl("/marketplace/v2/navitia/stop_schedules", {
      stop_area: STOPS.HIPPODROME_VINCENNES.BUS_77[0],
      line: LINE_REFS.BUS_77,
      data_freshness: "base_schedule",
    }),
  },

  ECOLE_DU_BREUIL: {
    BUS_201_TR: primUrl("/marketplace/stop-monitoring", {
      MonitoringRef: STOPS.ECOLE_DU_BREUIL.BUS_201[0],
      LineRef: LINE_REFS.BUS_201,
      MaximumStopVisits: 4,
    }),
    BUS_201_TH: primUrl("/marketplace/v2/navitia/stop_schedules", {
      stop_area: STOPS.ECOLE_DU_BREUIL.BUS_201[0],
      line: LINE_REFS.BUS_201,
      data_freshness: "base_schedule",
    }),
  },
};

// =====================================================
// ⚠️ Infos trafic
// =====================================================
export const TRAFFIC = {
  RERA: primUrl("/marketplace/general-message", { LineRef: LINE_REFS.RERA }),
  BUS_77: primUrl("/marketplace/general-message", { LineRef: LINE_REFS.BUS_77 }),
  BUS_201: primUrl("/marketplace/general-message", { LineRef: LINE_REFS.BUS_201 }),
};

// =====================================================
// 🌦️ Météo / Vélib / Actualités
// =====================================================
export const WEATHER_URL = "https://api.open-meteo.com/v1/forecast";
export const WEATHER_PARAMS = {
  latitude: 48.817,
  longitude: 2.454,
  current_weather: "true",
  timezone: "Europe/Paris",
};

export const NEWS_FEED_URL = "https://www.francetvinfo.fr/titres.rss";
export const NEWS_FEED_BACKUP = "https://www.lemonde.fr/rss/une.xml";

export const VELIB_STATION_IDS = {
  VINCENNES: 12163,
  BREUIL: 12128,
};
export const VELIB_STATION_NAMES = {
  [VELIB_STATION_IDS.VINCENNES]: "Hippodrome de Vincennes",
  [VELIB_STATION_IDS.BREUIL]: "École du Breuil / Pyramides",
};

// =====================================================
// 🔁 Rafraîchissements + Config d’affichage
// =====================================================
export const REFRESH_INTERVALS = {
  RER: 30000,
  BUS: 45000,
  TRAFFIC: 120000,
  METEO: 300000,
  VELIB: 60000,
  NEWS: 180000,
};

export const API_ENDPOINTS = {
  ...URLS.JOINVILLE_RER,
  ...URLS.HIPPODROME_VINCENNES,
  ...URLS.ECOLE_DU_BREUIL,
};

export const TRANSPORT_CONFIG = {
  JOINVILLE_RER: {
    label: "Joinville-le-Pont (RER A)",
    line: LINE_REFS.RERA,
    stop: STOPS.JOINVILLE_RER.RERA[0],
  },
  HIPPODROME_VINCENNES: {
    label: "Hippodrome de Vincennes (Bus 77)",
    line: LINE_REFS.BUS_77,
    stop: STOPS.HIPPODROME_VINCENNES.BUS_77[0],
  },
  ECOLE_DU_BREUIL: {
    label: "École du Breuil / Pyramides (Bus 201)",
    line: LINE_REFS.BUS_201,
    stop: STOPS.ECOLE_DU_BREUIL.BUS_201[0],
  },
};
