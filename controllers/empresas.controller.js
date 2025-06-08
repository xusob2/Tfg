const db = require('../models');
const { empresas, trabajadores } = db;

// Crear una empresa
exports.createEmpresa = async (req, res) => {
  try {
    const nuevaEmpresa = await empresas.create(req.body);
    res.status(201).json(nuevaEmpresa);
  } catch (error) {
    res.status(500).json({ error: 'Error al crear la empresa', detalles: error.message });
  }
};

// Obtener todas las empresas (con trabajadores opcionalmente)
exports.getViviendas = async (req, res) => {
  try {
    const { id } = req.query;
    const where = id ? { id } : {};

    const viviendas = await Vivienda.findAll({ where });
    res.json(viviendas);
  } catch (error) {
    console.error('Error al obtener viviendas:', error);
    res.status(500).json({ error: 'Error al obtener viviendas' });
  }
};

// Actualizar una empresa
exports.updateVivienda = async (req, res) => {
  try {
    const { id, ...data } = req.body;
    if (!id) return res.status(400).json({ error: 'Falta el ID de la vivienda' });

    const [modificada] = await Vivienda.update(data, { where: { id } });
    if (!modificada) return res.status(404).json({ error: 'Vivienda no encontrada' });

    res.json({ mensaje: 'Vivienda actualizada' });
  } catch (error) {
    console.error('Error al actualizar vivienda:', error);
    res.status(500).json({ error: 'Error al actualizar vivienda', detalles: error.message });
  }
};

// Eliminar una empresa
exports.deleteEmpresa = async (req, res) => {
  try {
    const filasEliminadas = await empresas.destroy({
      where: { id: req.params.id }
    });
    if (filasEliminadas === 0) return res.status(404).json({ error: 'Empresa no encontrada' });
    res.json({ mensaje: 'Empresa eliminada' });
  } catch (error) {
    res.status(500).json({ error: 'Error al eliminar empresa', detalles: error.message });
  }
};
