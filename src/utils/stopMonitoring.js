import { primUrl, LINE_REFS, STOPS } from "../constants.js";

export async function tryStops(lineRef, stopPoints, fetchFn = fetch) {
  for (const MonitoringRef of stopPoints) {
    const url = primUrl("/marketplace/stop-monitoring", { MonitoringRef, LineRef: lineRef });
    try {
      const res = await fetchFn(url);
      if (!res.ok) continue;
      const json = await res.json().catch(() => null);
      const visits = json?.Siri?.ServiceDelivery?.StopMonitoringDelivery?.[0]?.MonitoredStopVisit ?? [];
      if (Array.isArray(visits) && visits.length > 0) {
        return { url, json, MonitoringRef };
      }
    } catch (e) {
      console.warn("⚠️ Erreur de fetch sur", lineRef, MonitoringRef, e);
    }
  }
  return null;
}

export async function fetchStopMonitoring(zone, lineKey) {
  const lineRef = LINE_REFS[lineKey];
  const stopPoints = (STOPS[zone] || {})[lineKey] || [];
  if (!stopPoints.length) {
    console.warn(`🚫 Aucun StopPoint défini pour ${lineKey} à ${zone}`);
    return null;
  }
  const result = await tryStops(lineRef, stopPoints);
  if (!result) {
    console.warn(`❌ Aucun passage trouvé pour ${lineKey} (${zone})`);
    return null;
  }
  return result.json;
}

export function parseStopMonitoring(data) {
  const visits = data?.Siri?.ServiceDelivery?.StopMonitoringDelivery?.[0]?.MonitoredStopVisit ?? [];
  return visits.map((v) => {
    const mvj = v?.MonitoredVehicleJourney;
    const call = mvj?.MonitoredCall;
    const aimed = call?.AimedDepartureTime || call?.AimedArrivalTime;
    const expected = call?.ExpectedDepartureTime || call?.ExpectedArrivalTime;
    const delay = aimed && expected ? Math.round((new Date(expected) - new Date(aimed)) / 60000) : 0;

    return {
      line: mvj?.LineRef?.value,
      destination: call?.DestinationDisplay?.[0]?.value || mvj?.DestinationName?.[0]?.value,
      expectedTime: expected,
      aimedTime: aimed,
      delay: delay > 0 ? `+${delay} min` : null,
      status: call?.DepartureStatus || "onTime",
      vehicleAtStop: call?.VehicleAtStop || false,
    };
  });
}
