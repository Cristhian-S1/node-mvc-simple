import express from "express";
import cors from "cors";
import pkg from "pg";
import { publicacionesRouter } from "./routes/publicaciones.js";
import { usuariosRouter } from "./routes/usuarios.js";

const { Pool } = pkg;

// Configuración de PostgreSQL
export const pool = new Pool({
  user: "cristhian",
  host: "localhost",
  database: "dae",
  password: "femayor9",
  port: 5432,
});

const app = express();

// Middlewares
app.use(cors());
app.use(express.json());

// Rutas
app.use("/publicaciones", publicacionesRouter);
app.use("/usuarios", usuariosRouter);

// Health check
app.get("/health", (req, res) => {
  res.json({ status: "ok" });
});

const PORT = process.env.PORT ?? 3000;

app.listen(PORT, () => {
  console.log(`Server listening on http://localhost:${PORT}`);
});
