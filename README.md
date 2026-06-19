# Proyecto Programación Web — Portafolio Semestral

Estructura de carpetas:

```
proyecto/
├── Backend/
│   ├── server.js        ← API Express (GET /api/tareas)
│   ├── seed.js          ← Script para crear e inicializar la BD
│   ├── tareas.sqlite    ← Base de datos SQLite (generada por seed.js)
│   └── package.json
└── Frontend/
    └── index.html       ← Página CV con fetch a la API
```

---

## Cómo ejecutar

### 1. Instalar dependencias del Backend

```bash
cd Backend
npm install
```

### 2. Crear la base de datos (solo la primera vez)

```bash
node seed.js
```

Esto genera `tareas.sqlite` con la tabla `tareas` y 4 registros.

### 3. Iniciar el servidor API

```bash
node server.js
```

El servidor corre en **http://localhost:3000**

- `GET /api/tareas` → devuelve JSON con todas las tareas

### 4. Abrir el Frontend

Abre `Frontend/index.html` directamente en el navegador.  
La página hace `fetch` a `http://localhost:3000/api/tareas` y despliega las tareas.

---

## Base de datos

**Motor:** SQLite (vía `sql.js`, sin binarios nativos)  
**Archivo:** `Backend/tareas.sqlite`

```sql
CREATE TABLE tareas (
  id     INTEGER PRIMARY KEY AUTOINCREMENT,
  titulo TEXT NOT NULL,
  url    TEXT NOT NULL
);
```

| id | titulo | url |
|----|--------|-----|
| 1 | Tarea 1 — Página HTML Personal (v1) | https://github.com/hector/tarea1-html |
| 2 | Tarea 2 — DataForge: Panel de Administración de BD | https://github.com/hector/dataforge |
| 3 | Tarea 3 — Crealistudio: Catálogo Web | https://github.com/hector/crealistudio |
| 4 | Tarea 4 — API REST con Node.js y Express | https://github.com/hector/tarea4-api |

---

## Tecnologías

| Capa | Tecnología |
|------|-----------|
| BD | SQLite (`sql.js`) |
| Backend | Node.js + Express + CORS |
| Frontend | HTML5 + CSS3 + JS (Fetch API) |
