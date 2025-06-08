const db = require('../models');
const incidencia = db.incidencia;

exports.crearIncidencia = async (req, res) => {
  try {
    const {
      id_piso,
      id_oficio,
      descripcion_incidencia,
      avisado,
      arreglado,
      fecha_aviso,
      fecha_solucionador,
      observaciones
    } = req.body;

    if (!id_piso || !id_oficio || !descripcion_incidencia) {
      return res.status(400).json({ error: 'Faltan campos obligatorios' });
    }

    const imagen_url = req.file ? req.file.path : null;

    const nuevaIncidencia = await incidencia.create({
      id_piso,
      id_oficio,
      descripcion_incidencia,
      avisado: avisado || false,
      arreglado: arreglado || false,
      fecha_aviso,
      fecha_solucionador,
      imagen_url,
      observaciones
    });

    res.status(201).json(nuevaIncidencia);
  } catch (error) {
    console.error('Error al crear la tarea:', error);
    res.status(500).json({ error: 'Error interno del servidor' });
  }
};

exports.getIncidencias = async (req, res) => {
  try {
    const incidencias = await incidencia.findAll();
    res.status(200).json(incidencias);
  } catch (error) {
    console.error('Error al obtener incidencias:', error);
    res.status(500).json({ error: 'Error interno del servidor' });
  }
};

exports.updateIncidencia = async (req, res) => {
  try {
    const id = req.params.id;
    const {
      id_piso,
      id_oficio,
      descripcion_incidencia,
      avisado,
      arreglado,
      fecha_aviso,
      fecha_solucionador,
      observaciones
    } = req.body;

    const incidenciaExistente = await incidencia.findByPk(id);
    if (!incidenciaExistente) {
      return res.status(404).json({ error: 'Incidencia no encontrada' });
    }

    await incidencia.update({
      id_piso,
      id_oficio,
      descripcion_incidencia,
      avisado,
      arreglado,
      fecha_aviso,
      fecha_solucionador,
      observaciones
    }, { where: { id } });

    const incidenciaActualizada = await incidencia.findByPk(id);
    res.status(200).json(incidenciaActualizada);
  } catch (error) {
    console.error('Error al actualizar la incidencia:', error);
    res.status(500).json({ error: 'Error interno del servidor' });
  }
};

exports.deleteIncidencia = async (req, res) => {
  try {
    const id = req.params.id;
    const deleted = await incidencia.destroy({ where: { id } });
    if (!deleted) {
      return res.status(404).json({ error: 'Incidencia no encontrada' });
    }
    res.status(204).send();
  } catch (error) {
    console.error('Error al eliminar la incidencia:', error);
    res.status(500).json({ error: 'Error interno del servidor' });
  }
};
