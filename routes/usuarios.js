import { Router } from "express";
import { registro, login } from "../controllers/usuarios.js";

export const usuariosRouter = Router();

usuariosRouter.post("/registro", registro);
usuariosRouter.post("/login", login);
