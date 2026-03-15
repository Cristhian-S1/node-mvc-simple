import * as UsuarioModel from "../models/usuario.js";

export const registro = async (req, res) => {
  try {
    const nuevoUsuario = await UsuarioModel.create(req.body);

    // No devolver la contraseña
    const { us_contrasena, ...usuarioSinPassword } = nuevoUsuario;

    res.status(201).json(usuarioSinPassword);
  } catch (error) {
    console.error("Error en registro:", error);

    if (error.code === "23505") {
      return res.status(409).json({ error: "El email ya está registrado" });
    }

    res.status(500).json({ error: "Error en registro" });
  }
};

export const login = async (req, res) => {
  try {
    const { us_email, us_contrasena } = req.body;
    const usuario = await UsuarioModel.login(us_email, us_contrasena);

    if (!usuario) {
      return res.status(401).json({ error: "Email o contraseña incorrectos" });
    }

    // No devolver la contraseña
    const { us_contrasena: _, ...usuarioSinPassword } = usuario;

    res.json({
      message: "Login exitoso",
      usuario: usuarioSinPassword,
    });
  } catch (error) {
    console.error("Error en login:", error);
    res.status(500).json({ error: "Error en login" });
  }
};
