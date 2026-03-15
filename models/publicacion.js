import { pool } from "../app.js";

export const getAll = async (fo_id, us_id, estado) => {
  let query = `
    SELECT p.*, 
           u.us_nombre, 
           u.us_apellido,
           f.fo_titulo
    FROM publicacion p
    LEFT JOIN usuarios u ON p.us_id = u.us_id
    LEFT JOIN foro f ON p.fo_id = f.fo_id
    WHERE p.pu_eliminacion = false
  `;
  const params = [];

  if (fo_id) {
    params.push(fo_id);
    query += ` AND p.fo_id = $${params.length}`;
  }

  if (us_id) {
    params.push(us_id);
    query += ` AND p.us_id = $${params.length}`;
  }

  if (estado !== undefined) {
    params.push(estado);
    query += ` AND p.pu_estado = $${params.length}`;
  }

  query += " ORDER BY p.pu_fecha DESC";

  const result = await pool.query(query, params);
  return result.rows;
};

export const getById = async (id) => {
  const result = await pool.query(
    `SELECT p.*, 
            u.us_nombre, 
            u.us_apellido,
            f.fo_titulo
     FROM publicacion p
     LEFT JOIN usuarios u ON p.us_id = u.us_id
     LEFT JOIN foro f ON p.fo_id = f.fo_id
     WHERE p.pu_id = $1 AND p.pu_eliminacion = false`,
    [id]
  );
  return result.rows[0];
};

export const create = async (data) => {
  const {
    pu_titulo,
    pu_descripcion,
    pu_image,
    pu_fecha = new Date().toISOString().split("T")[0],
    pu_eliminacion = false,
    pu_estado = false,
    us_id,
    fo_id,
  } = data;

  const result = await pool.query(
    `INSERT INTO publicacion (
      pu_titulo,
      pu_descripcion,
      pu_image,
      pu_fecha,
      pu_eliminacion,
      pu_estado,
      us_id,
      fo_id
    ) VALUES ($1, $2, $3, $4, $5, $6, $7, $8)
    RETURNING *`,
    [
      pu_titulo,
      pu_descripcion,
      pu_image,
      pu_fecha,
      pu_eliminacion,
      pu_estado,
      us_id,
      fo_id,
    ]
  );
  return result.rows[0];
};

export const update = async (id, data) => {
  const fields = [];
  const values = [];
  let paramCount = 1;

  for (const [key, value] of Object.entries(data)) {
    fields.push(`${key} = $${paramCount}`);
    values.push(value);
    paramCount++;
  }

  if (fields.length === 0) return null;

  values.push(id);

  const result = await pool.query(
    `UPDATE publicacion
     SET ${fields.join(", ")}
     WHERE pu_id = $${paramCount} AND pu_eliminacion = false
     RETURNING *`,
    values
  );
  return result.rows[0];
};

export const remove = async (id) => {
  const result = await pool.query(
    `UPDATE publicacion
     SET pu_eliminacion = true
     WHERE pu_id = $1
     RETURNING pu_id`,
    [id]
  );
  return result.rowCount > 0;
};
