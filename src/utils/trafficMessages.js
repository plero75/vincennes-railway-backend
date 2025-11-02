
import { primUrl, LINE_REFS } from "../constants.js";

export async function fetchTrafficMessages(lineKey) {
  const lineRef = LINE_REFS[lineKey];
  if (!lineRef) {
    console.warn(`🚫 Ligne inconnue : ${lineKey}`);
    return null;
  }
  const url = primUrl("/marketplace/general-message", { LineRef: lineRef });
  try {
    const res = await fetch(url);
    if (!res.ok) return null;
    const json = await res.json().catch(() => null);
    return json;
  } catch (err) {
    console.error("❌ Erreur fetchTrafficMessages:", err);
    return null;
  }
}

export function parseTrafficMessages(data) {
  const messages = data?.Siri?.ServiceDelivery?.GeneralMessageDelivery?.[0]?.InfoMessage ?? [];
  return messages.map((m) => {
    const content = m?.Content?.Message || {};
    const situation = m?.SituationRef?.value || "";
    const title = content?.MessageText?.[0]?.value || content?.MessageText?.value || "Message trafic";
    const details = (content?.MessageText || [])
      .map((t) => (t?.value || "").trim())
      .filter(Boolean)
      .join(" ");
    const severity = m?.InfoMessageVersionFrame?.Severity || "normal";
    const start = m?.InfoMessageVersionFrame?.ValidityPeriod?.StartTime || m?.RecordedAtTime;
    const end = m?.InfoMessageVersionFrame?.ValidityPeriod?.EndTime || null;
    return { id: situation, title, description: details, severity, start, end };
  });
}

export function getActiveTrafficMessage(data) {
  const parsed = parseTrafficMessages(data);
  if (!parsed.length) return null;
  const active = parsed.find((m) => !m.end || new Date(m.end).getTime() > Date.now());
  return active ? `⚠️ ${active.title}` : null;
}
