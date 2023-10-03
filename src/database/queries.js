import config from '../config';

// Set table name
const asesores = config.tblAsesores;

// Set queries related to the table
export const queriesAsesores = {
  getAllAsesores: `SELECT * FROM ${asesores}`,
  getAsesorById: `SELECT * FROM ${asesores} WHERE id = @id`,
  addNewAsesor: `INSERT INTO ${asesores} (id_asesor, nombre_asesor, equipo_entidad, compania, observaciones, fecha_novedad, usuario) VALUES (@id_asesor, @nombre_asesor, @equipo_entidad, @compania, @observaciones, @fecha_novedad, @usuario)`,
  deleteAsesor: `DELETE FROM ${asesores} WHERE id = @id`,
  getTotalAsesores: `SELECT COUNT(*) FROM ${asesores}`,
  updateAsesorById: `UPDATE ${asesores} SET id_asesor = @id_asesor, nombre_asesor = @nombre_asesor, equipo_entidad = @equipo_entidad, compania = @compania, observaciones = @observaciones, fecha_novedad = @fecha_novedad, usuario = @usuario WHERE id = @id`,
};
