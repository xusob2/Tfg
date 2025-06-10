const db = require("../models");
const sequelize = db.sequelize;
const Inquilino = db.inquilinos;
const Usuario = db.Usuario;

// Crear inquilino
exports.crearInquilino = async (req, res) => {
  const t = await sequelize.transaction();
  try {
    // 1. Crear usuario
    const usuario = await Usuario.create(
      {
        nombre_usuario: req.body.nombre_usuario,
        contraseña: req.body.contraseña,
        rol: "inquilinos",
      },
      { transaction: t }
    );

    const viviendaOcupada = await Inquilino.findOne({
      where: { vivienda_id: req.body.vivienda_id },
    });

    if (viviendaOcupada) {
      return res
        .status(400)
        .json({ error: "Esa vivienda ya tiene un inquilino" });
    }
    // 2. Crear inquilino vinculado al usuario y la vivienda
    const inquilino = await Inquilino.create(
      {
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

exports.getInquilinoById = async (req, res) => {
  try {
    const inquilino = await Inquilino.findByPk(+req.params.id);
    if (!inquilino) return res.status(404).json({ error: 'Inquilino no encontrado' });
    res.json(inquilino);
  } catch (error) {
    res.status(500).json({ error: 'Error al buscar trabajador', detalles: error.message });
  }
};