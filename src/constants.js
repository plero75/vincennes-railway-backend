// =====================================================
// 🌐 constants.js — Dashboard Vincennes / Joinville (2025-11)
// =====================================================

export const PROXY_URL =
  "https://ratp-proxy.hippodrome-proxy42.workers.dev/?url=";

function primUrl(path, params) {
  const base = "https://prim.iledefrance-mobilites.fr" + path;
  const qs = new URLSearchParams(params).toString();
  return PROXY_URL + encodeURIComponent(`${base}?${qs}`);
}

// =====================================================
// 🚆 LineRef officiels PRIM (Joinville-le-Pont)
// =====================================================
export const LINE_REFS = {
  RERA: "STIF:Line::A:",
  BUS_77: "STIF:Line::C02251:",
  BUS_101: "STIF:Line::C01130:",
  BUS_108: "STIF:Line::C01135:",
  BUS_110: "STIF:Line::C01137:",
  BUS_112: "STIF:Line::C01139:",
  BUS_120: "STIF:Line::C01141:",
  BUS_281: "STIF:Line::C02270:",
  BUS_520: "STIF:Line::C01399:",
  N33: "STIF:Line::C01400:",
};

// =====================================================
// 🅿️ StopArea / MonitoringRef par ligne
// =====================================================
export const STOPS_JOINVILLE = {
  RERA: "STIF:StopArea:SP:43135:",
  BUS_77: "STIF:StopArea:SP:463641:",
  BUS_101: "STIF:StopArea:SP:70640:",
  BUS_108: "STIF:StopArea:SP:70640:",
  BUS_110: "STIF:StopArea:SP:70640:",
  BUS_112: "STIF:StopArea:SP:463641:",
  BUS_120: "STIF:StopArea:SP:70640:",
  BUS_281: "STIF:StopArea:SP:70640:",
  BUS_520: "STIF:StopArea:SP:70640:",
  N33: "STIF:StopArea:SP:463641:",
};

// =====================================================
// 🌍 Génération des URLs temps réel et théoriques
// =====================================================
export const URLS_JOINVILLE = Object.fromEntries(
  Object.entries(STOPS_JOINVILLE).flatMap(([line, stop]) => [
    [
      line + "_TR",
      primUrl("/marketplace/stop-monitoring", {
        MonitoringRef: stop,
        LineRef: LINE_REFS[line],
        MaximumStopVisits: 4,
      }),
    ],
    [
      line + "_TH",
      primUrl("/marketplace/v2/navitia/stop_schedules", {
        stop_area: stop,
        line: LINE_REFS[line],
        data_freshness: "base_schedule",
      }),
    ],
  ])
);

// =====================================================
// ⚠️ Infos trafic / perturbations
// =====================================================
export const TRAFFIC = Object.fromEntries(
  Object.entries(LINE_REFS).map(([key, ref]) => [
    key,
    primUrl("/marketplace/general-message", { LineRef: ref }),
  ])
);

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
// 🔁 Configurations d’affichage et de rafraîchissement
// =====================================================
export const REFRESH_INTERVALS = {
  RER: 30000,
  BUS: 45000,
  TRAFFIC: 120000,
  METEO: 300000,
  VELIB: 60000,
  NEWS: 180000,
};

// =====================================================
// 🧭 Config du module Transport
// =====================================================
export const TRANSPORT_CONFIG = {
  JOINVILLE: {
    label: "Joinville-le-Pont (RER + Bus)",
    lines: Object.keys(LINE_REFS),
  },
};

// =====================================================
// 🔗 Points d’accès unifiés pour le dashboard
// =====================================================
export const API_ENDPOINTS = {
  ...URLS_JOINVILLE,
};

// =====================================================
// 🧱 Export global STOPS (pour compatibilité)
// =====================================================
export const STOPS = {
  JOINVILLE: STOPS_JOINVILLE,
};
