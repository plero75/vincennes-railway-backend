// constants.js — correction finale pour export 'primUrl'

export const PROXY_URL = "https://ratp-proxy.hippodrome-proxy42.workers.dev/?url=";

export function withProxy(url) {
  return PROXY_URL + encodeURIComponent(url);
}

// ✅ Ajout de l'export manquant 'primUrl'
export function primUrl(path, params = {}) {
  const base = "https://prim.iledefrance-mobilites.fr" + path;
  const qs = new URLSearchParams(params).toString();
  return withProxy(`${base}?${qs}`);
}

// Exemple d'autres exports conservés
export const LINE_REFS = {
  RERA: "STIF:Line::A:",
  BUS_77: "STIF:Line::C02251:",
};

export const STOPS_JOINVILLE = {
  RERA: "STIF:StopArea:SP:43135:",
  BUS_77: "STIF:StopArea:SP:463641:",
};

export const STOPS = { JOINVILLE: STOPS_JOINVILLE };

export const REFRESH_INTERVALS = {
  RER: 30000,
  BUS: 45000,
};
