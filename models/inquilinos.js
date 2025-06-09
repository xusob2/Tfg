module.exports = (sequelize, DataTypes) => {
  const inquilinos = sequelize.define('inquilinos', {
    id: {
      type: DataTypes.BIGINT,
      primaryKey: true,
      allowNull: false,
      references: {
        model: 'usuarios',
        key: 'id'
      }
    },
    created_at: {
      type: DataTypes.DATE, // timestamp with time zone
      allowNull: false,
      defaultValue: DataTypes.NOW
    },
    nombre: {
      type: DataTypes.STRING,
      allowNull: false
    },
    apellidos: {
      type: DataTypes.STRING,
      allowNull: false
    },
    fecha_nacimiento: {
      type: DataTypes.DATEONLY,
      allowNull: false
    },
    dni: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true
    }
  }, {
    tableName: 'inquilinos',
    timestamps: false
  });

  return inquilinos;
};