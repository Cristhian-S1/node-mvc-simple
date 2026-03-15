import { pool } from "../app.js";

export const create = async (data) => {
  const { us_nombre, us_apellido, us_email, us_contrasena, us_contacto } = data;

  const result = await pool.query(
    `INSERT INTO usuarios (
      us_nombre,
      us_apellido,
      us_email,
      us_contrasena,
      us_contacto
    ) VALUES ($1, $2, $3, $4, $5)
    RETURNING *`,
    [us_nombre, us_apellido, us_email, us_contrasena, us_contacto]
  );
  return result.rows[0];
};

export const login = async (us_email, us_contrasena) => {
  const result = await pool.query(
    `SELECT us_id, 
            us_nombre, 
            us_apellido, 
            us_email, 
            us_contacto,
            us_contrasena
     FROM usuarios
     WHERE us_email = $1 AND us_contrasena = $2`,
    [us_email, us_contrasena]
  );
  return result.rows[0];
};
