// server.js — API REST para el proyecto de Programación Web
// Endpoint: GET /api/tareas  →  devuelve todas las tareas de la BD SQLite

const express = require("express");
const cors    = require("cors");
const initSqlJs = require("sql.js");
const fs      = require("fs");
const path    = require("path");

const app    = express();
const PORT   = 3000;
const DB_PATH = path.join(__dirname, "tareas.sqlite");

app.use(cors());
app.use(express.json());

// ─── Helper: carga la BD desde disco ────────────────────────────────────────
async function loadDB() {
  const SQL    = await initSqlJs();
  const buffer = fs.readFileSync(DB_PATH);
  return new SQL.Database(buffer);
}

// ─── GET /api/tareas ─────────────────────────────────────────────────────────
app.get("/api/tareas", async (req, res) => {
  try {
    const db   = await loadDB();
    const stmt = db.prepare("SELECT id, titulo, url FROM tareas ORDER BY id");
    const rows = [];

    while (stmt.step()) {
      rows.push(stmt.getAsObject());
    }
    stmt.free();
    db.close();

    res.json({ ok: true, data: rows });
  } catch (err) {
    console.error(err);
    res.status(500).json({ ok: false, error: "Error al consultar la BD." });
  }
});

// ─── Ruta raíz informativa ───────────────────────────────────────────────────
app.get("/", (req, res) => {
  res.json({
    mensaje: "API de Tareas — Programación Web",
    endpoints: { tareas: "GET /api/tareas" },
  });
});

app.listen(PORT, () => {
  console.log(`🚀 Servidor corriendo en http://localhost:${PORT}`);
  console.log(`   → GET http://localhost:${PORT}/api/tareas`);
});
