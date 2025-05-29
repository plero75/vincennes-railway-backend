const express = require("express");
const fetch = require("node-fetch");
const app = express();
require("dotenv").config();

const PORT = process.env.PORT || 8080;
const API_KEY = process.env.API_KEY;
const PRIM_BASE_URL = "https://prim.iledefrance-mobilites.fr/marketplace/stop-monitoring";

app.get("/api/rer", async (req, res) => {
    try {
        const url = PRIM_BASE_URL + "?MonitoringRef=STIF:StopPoint:Q:8768238:";
        const response = await fetch(url, {
            headers: { apikey: API_KEY }
        });
        const data = await response.json();
        res.json(data);
    } catch (err) {
        res.status(500).json({ error: "Erreur API PRIM", detail: err.message });
    }
});

app.get("/api/trafic", (req, res) => {
    res.json({ alert: "Trafic normal" });
});

app.listen(PORT, () => console.log("✅ Serveur PRIM proxy lancé sur le port " + PORT));
