// seed.js — crea e inicializa la BD tareas.sqlite
const initSqlJs = require("sql.js");
const fs = require("fs");
const path = require("path");

const DB_PATH = path.join(__dirname, "tareas.sqlite");

async function seed() {
  const SQL = await initSqlJs();
  const db = new SQL.Database();

  db.run(`
    CREATE TABLE IF NOT EXISTS tareas (
      id   INTEGER PRIMARY KEY AUTOINCREMENT,
      titulo TEXT NOT NULL,
      url    TEXT NOT NULL
    )
  `);

  const tareas = [
    {
      titulo: "Lista de Etiquetas HTML (tags)",
      url: "https://classroom.google.com/c/ODQzMDk4ODUzMDY0/a/ODQ0NDAzNjI4MTgz/details",
    },
    {
      titulo: "Página web estática y página web dinámica",
      url: "https://classroom.google.com/c/ODQzMDk4ODUzMDY0/a/ODQ1OTg4NDY5MjAy/details",
    },
    {
      titulo: "Hosting, VPS y Cloud",
      url: "https://classroom.google.com/c/ODQzMDk4ODUzMDY0/a/Nzk0MTE5MzEyODg5/details",
    },
    {
      titulo: "Primer Ejercicio HTML",
      url: "https://classroom.google.com/c/ODQzMDk4ODUzMDY0/a/ODUwNjEyMTMzMzcy/details",
    },
    {
      titulo: "Promedio de 3 calificaciones",
      url: "https://classroom.google.com/c/ODQzMDk4ODUzMDY0/a/ODU2OTIzNzAwMTIz/details",
    },
    {
      titulo: "Tablas de Multiplicar",
      url: "https://classroom.google.com/c/ODQzMDk4ODUzMDY0/a/ODU3NTk5MTQzMDI4/details",
    },
    {
      titulo: "¿Cuál es la relación entre métodos HTTP y MySQL con Node.js? ¿Qué es un cURL?",
      url: "https://classroom.google.com/c/ODQzMDk4ODUzMDY0/a/ODY0MDQ3NzQzMTMz/details",
    },
  ];

  const stmt = db.prepare(
    "INSERT INTO tareas (titulo, url) VALUES (:titulo, :url)"
  );
  tareas.forEach((t) => stmt.run({ ":titulo": t.titulo, ":url": t.url }));
  stmt.free();

  // Persistir en disco como buffer binario
  const data = db.export();
  fs.writeFileSync(DB_PATH, Buffer.from(data));
  db.close();

  console.log(`✅ BD creada en ${DB_PATH} con ${tareas.length} tareas.`);
}

seed().catch(console.error);
