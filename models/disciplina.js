const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('disciplina', {
    id: {
      autoIncrement: true,
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true
    },
    nome: {
      type: DataTypes.STRING(255),
      allowNull: false,
      unique: "nome"
    },
    propina: {
      type: DataTypes.DECIMAL(8,2),
      allowNull: false
    },
    descricao: {
      type: DataTypes.TEXT,
      allowNull: true
    },
    id_plano: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'plano',
        key: 'id'
      }
    }
  }, {
    sequelize,
    tableName: 'disciplina',
    timestamps: false,
    indexes: [
      {
        name: "PRIMARY",
        unique: true,
        using: "BTREE",
        fields: [
          { name: "id" },
        ]
      },
      {
        name: "nome",
        unique: true,
        using: "BTREE",
        fields: [
          { name: "nome" },
        ]
      },
      {
        name: "id_plano",
        using: "BTREE",
        fields: [
          { name: "id_plano" },
        ]
      },
    ]
  });
};
