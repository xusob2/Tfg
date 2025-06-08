const db = require('../models');
const Trabajador = db.trabajadores;

// Crear trabajador
exports.crearTrabajador = async (req, res) => {
  try {
    const nuevo = await Trabajador.create(req.body);
    res.status(201).json(nuevo);
  } catch (error) {
    res.status(500).json({ error: 'Error al crear trabajador', detalles: error.message });
  }
};

// Obtener todos los trabajadores
exports.getTrabajadores = async (req, res) => {
  try {
    const lista = await Trabajador.findAll({ include: ['empresa'] });
    res.json(lista);
  } catch (error) {
    res.status(500).json({ error: 'Error al obtener trabajadores', detalles: error.message });
  }
};

// Obtener por ID
exports.getTrabajadorById = async (req, res) => {
  try {
    const trabajador = await Trabajador.findByPk(req.params.id, { include: ['empresa'] });
    if (!trabajador) return res.status(404).json({ error: 'Trabajador no encontrado' });
    res.json(trabajador);
  } catch (error) {
    res.status(500).json({ error: 'Error al buscar trabajador', detalles: error.message });
  }
};

// Actualizar
exports.updateTrabajador = async (req, res) => {
  try {
    const [modificado] = await Trabajador.update(req.body, { where: { id: req.params.id } });
    if (!modificado) return res.status(404).json({ error: 'Trabajador no encontrado' });
    res.json({ mensaje: 'Trabajador actualizado' });
  } catch (error) {
    res.status(500).json({ error: 'Error al actualizar', detalles: error.message });
  }
};

// Eliminar
exports.deleteTrabajador = async (req, res) => {
  try {
    const eliminado = await Trabajador.destroy({ where: { id: req.params.id } });
    if (!eliminado) return res.status(404).json({ error: 'Trabajador no encontrado' });
    res.json({ mensaje: 'Trabajador eliminado' });
  } catch (error) {
    res.status(500).json({ error: 'Error al eliminar trabajador', detalles: error.message });
  }
};
