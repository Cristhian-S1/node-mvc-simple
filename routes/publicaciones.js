import { Router } from "express";
import {
  getAllPublicaciones,
  getPublicacionById,
  createPublicacion,
  updatePublicacion,
  deletePublicacion,
} from "../controllers/publicaciones.js";

export const publicacionesRouter = Router();

publicacionesRouter.get("/", getAllPublicaciones);
publicacionesRouter.get("/:id", getPublicacionById);
publicacionesRouter.post("/", createPublicacion);
publicacionesRouter.patch("/:id", updatePublicacion);
publicacionesRouter.delete("/:id", deletePublicacion);
