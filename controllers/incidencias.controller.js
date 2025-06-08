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
