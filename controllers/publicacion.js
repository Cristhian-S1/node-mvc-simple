import * as PublicacionModel from "../models/publicacion.js";

export const getAllPublicaciones = async (req, res) => {
  try {
    const { fo_id, us_id, estado } = req.query;
    const publicaciones = await PublicacionModel.getAll(fo_id, us_id, estado);
    res.json(publicaciones);
  } catch (error) {
    console.error("Error obteniendo publicaciones:", error);
    res.status(500).json({ error: "Error obteniendo publicaciones" });
  }
};

export const getPublicacionById = async (req, res) => {
  try {
    const { id } = req.params;
    const publicacion = await PublicacionModel.getById(id);

    if (!publicacion) {
      return res.status(404).json({ error: "Publicación no encontrada" });
    }

    res.json(publicacion);
  } catch (error) {
    console.error("Error obteniendo publicación:", error);
    res.status(500).json({ error: "Error obteniendo publicación" });
  }
};

export const createPublicacion = async (req, res) => {
  try {
    const nuevaPublicacion = await PublicacionModel.create(req.body);
    res.status(201).json(nuevaPublicacion);
  } catch (error) {
    console.error("Error creando publicación:", error);
    res.status(500).json({ error: "Error creando publicación" });
  }
};

export const updatePublicacion = async (req, res) => {
  try {
    const { id } = req.params;
    const publicacionActualizada = await PublicacionModel.update(id, req.body);

    if (!publicacionActualizada) {
      return res.status(404).json({ error: "Publicación no encontrada" });
    }

    res.json(publicacionActualizada);
  } catch (error) {
    console.error("Error actualizando publicación:", error);
    res.status(500).json({ error: "Error actualizando publicación" });
  }
};

export const deletePublicacion = async (req, res) => {
  try {
    const { id } = req.params;
    const resultado = await PublicacionModel.remove(id);

    if (!resultado) {
      return res.status(404).json({ error: "Publicación no encontrada" });
    }

    res.json({ message: "Publicación eliminada correctamente" });
  } catch (error) {
    console.error("Error eliminando publicación:", error);
    res.status(500).json({ error: "Error eliminando publicación" });
  }
};
