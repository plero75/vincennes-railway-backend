
import { REFRESH_INTERVALS } from "./src/constants.js";
import { renderRER } from "./src/modules/rer.js";
import { renderBus } from "./src/modules/bus.js";
import { fetchTrafficMessages, getActiveTrafficMessage } from "./src/utils/trafficMessages.js";

async function refreshAll() {
  await renderRER(document.getElementById("rer-joinville"), "JOINVILLE_RER");

  await renderBus(document.getElementById("bus-77"), "JOINVILLE_RER", "BUS_77", "Bus 77");
  await renderBus(document.getElementById("bus-201"), "JOINVILLE_RER", "BUS_201", "Bus 201");
  await renderBus(document.getElementById("bus-108"), "JOINVILLE_RER", "BUS_108", "Bus 108");
  await renderBus(document.getElementById("bus-110"), "JOINVILLE_RER", "BUS_110", "Bus 110");
  await renderBus(document.getElementById("bus-101"), "JOINVILLE_RER", "BUS_101", "Bus 101");
  await renderBus(document.getElementById("bus-281"), "JOINVILLE_RER", "BUS_281", "Bus 281");
  await renderBus(document.getElementById("bus-n33"), "JOINVILLE_RER", "N33", "Noctilien N33");
  await renderBus(document.getElementById("bus-n34"), "JOINVILLE_RER", "N34", "Noctilien N34");
  await renderBus(document.getElementById("bus-520"), "JOINVILLE_RER", "BUS_520", "Navette 520");

  const rawTraffic = await fetchTrafficMessages("RERA");
  const banner = getActiveTrafficMessage(rawTraffic);
  const el = document.getElementById("traffic-banner");
  el.textContent = banner || "✅ Trafic normal";
}

refreshAll();
setInterval(refreshAll, REFRESH_INTERVALS.BUS);
