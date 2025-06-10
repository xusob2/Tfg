const db = require("../models");
const Vivienda = db.viviendas;

// Crear vivienda
exports.crearVivienda = async (req, res) => {
  try {
    const nueva = await Vivienda.create(req.body);
    res.status(201).json(nueva);
  } catch (error) {
    res
      .status(500)
      .json({ error: "Error al crear vivienda", detalles: error.message });
  }
};

// Obtener todas las viviendas
exports.getViviendas = async (req, res) => {
  try {
    const viviendas = await db.viviendas.findAll(); // Solo datos de vivienda
    res.json(viviendas);
  } catch (error) {
    console.error('Error al obtener viviendas:', error);
    res.status(500).json({ error: 'Error al obtener viviendas' });
  }
};

// Obtener vivienda por ID
exports.getViviendaById = async (req, res) => {
  try {
    const vivienda = await Vivienda.findByPk(req.params.id);
    if (!vivienda)
      return res.status(404).json({ error: "Vivienda no encontrada" });
    res.json(vivienda);
  } catch (error) {
    res
      .status(500)
      .json({ error: "Error al buscar vivienda", detalles: error.message });
  }
};

// Actualizar vivienda
exports.updateVivienda = async (req, res) => {
  try {
    const [modificado] = await Vivienda.update(req.body, {
      where: { id: req.params.id },
    });
    if (!modificado)
      return res.status(404).json({ error: "Vivienda no encontrada" });
    res.json({ mensaje: "Vivienda actualizada" });
  } catch (error) {
    res
      .status(500)
      .json({ error: "Error al actualizar vivienda", detalles: error.message });
  }
};

// Eliminar vivienda
exports.deleteVivienda = async (req, res) => {
  try {
    const eliminado = await Vivienda.destroy({ where: { id: req.params.id } });
    if (!eliminado)
      return res.status(404).json({ error: "Vivienda no encontrada" });
    res.json({ mensaje: "Vivienda eliminada" });
  } catch (error) {
    res
      .status(500)
      .json({ error: "Error al eliminar vivienda", detalles: error.message });
  }
};
