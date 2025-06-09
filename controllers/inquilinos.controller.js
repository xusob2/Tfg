const db = require('../models');
const sequelize = db.sequelize;
const Inquilino = db.inquilinos;
const Usuario = db.Usuario;

// Crear inquilino
exports.crearInquilino = async (req, res) => {
  const t = await sequelize.transaction();
  try {
    // 1. Crear usuario
    const usuario = await Usuario.create({
      nombre_usuario: req.body.nombre_usuario,
      contraseña: req.body.password, // <- aquí está el fix
      rol: 'inquilino'
    }, { transaction: t });

    // 2. Crear inquilino vinculado
    const inquilino = await Inquilino.create({
      id: usuario.id,
      nombre: req.body.nombre,
      apellidos: req.body.apellidos,
      fecha_nacimiento: req.body.fecha_nacimiento,
      dni: req.body.dni,
      vivienda_id: req.body.vivienda_id // <- añadir esto si has añadido ese campo
    }, { transaction: t });

    await t.commit();
    res.status(201).json({ usuario, inquilino });
  } catch (error) {
    await t.rollback();
    console.error('Error al crear inquilino:', error);
    res.status(500).json({ error: 'Error al crear inquilino', detalles: error.message });
  }
};

// Obtener todos los inquilinos
exports.getInquilinos = async (req, res) => {
  try {
    const lista = await Inquilino.findAll();
    res.json(lista);
  } catch (error) {
    res.status(500).json({ error: 'Error al obtener trabajadores', detalles: error.message });
  }
};