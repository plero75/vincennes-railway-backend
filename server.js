const express = require("express");
const fetch = require("node-fetch");
const app = express();
require("dotenv").config();

const PORT = process.env.PORT || 8080;
const API_KEY = process.env.API_KEY;
const PRIM_BASE_URL = "https://prim.iledefrance-mobilites.fr/marketplace/stop-monitoring";

// Helper for PRIM fetch
async function fetchPRIM(monitoringRef) {
    const url = PRIM_BASE_URL + `?MonitoringRef=${monitoringRef}`;
    const res = await fetch(url, { headers: { apikey: API_KEY } });
    return await res.json();
}

// RER A - Joinville-le-Pont
app.get("/api/rer", async (req, res) => {
    try {
        const data = await fetchPRIM("STIF:StopPoint:Q:8768238:");
        res.json(data);
    } catch (err) {
        res.status(500).json({ error: "Erreur RER", detail: err.message });
    }
});

// Bus 77 - Route de la Pyramide
app.get("/api/bus77", async (req, res) => {
    try {
        const data = await fetchPRIM("STIF:StopPoint:Q:424877:");
        res.json(data);
    } catch (err) {
        res.status(500).json({ error: "Erreur Bus 77", detail: err.message });
    }
});

// Bus 201 - Carrefour de Beauté
app.get("/api/bus201", async (req, res) => {
    try {
        const data = await fetchPRIM("STIF:StopPoint:Q:425201:");
        res.json(data);
    } catch (err) {
        res.status(500).json({ error: "Erreur Bus 201", detail: err.message });
    }
});

// Vélib
app.get("/api/velib", async (req, res) => {
    try {
        const infoRes = await fetch("https://velib-metropole-opendata.smoove.pro/opendata/Velib_Metropole/station_information.json");
        const statusRes = await fetch("https://velib-metropole-opendata.smoove.pro/opendata/Velib_Metropole/station_status.json");
        const info = await infoRes.json();
        const status = await statusRes.json();
        res.json({ info, status });
    } catch (err) {
        res.status(500).json({ error: "Erreur Velib", detail: err.message });
    }
});

// Infos trafic simulées
app.get("/api/trafic", (req, res) => {
    res.json({ alert: "Aucune perturbation majeure en cours." });
});

app.listen(PORT, () => console.log("✅ Serveur PRIM Railway actif sur port " + PORT));
