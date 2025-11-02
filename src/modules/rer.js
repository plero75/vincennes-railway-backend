import { fetchStopMonitoring, parseStopMonitoring } from "../utils/stopMonitoring.js";

export async function renderRER(container, zone) {
  const raw = await fetchStopMonitoring(zone, "RERA");
  if (!raw) {
    container.innerHTML = `<div class="card"><h3>RER A</h3><p>Service terminé ou données indisponibles.</p></div>`;
    return;
  }
  const trips = parseStopMonitoring(raw).slice(0, 4);
  const rows = trips.map(t => `
    <div class="row">
      <div class="time">${new Date(t.expectedTime).toLocaleTimeString('fr-FR', {hour:'2-digit', minute:'2-digit'})}</div>
      <div class="dest">${t.destination || ""}</div>
      <div class="status">${t.delay ? `⏳ ${t.delay}` : "🟢 à l'heure"}</div>
    </div>
  `).join("");
  container.innerHTML = `<div class="card"><h3>RER A</h3>${rows}</div>`;
}
