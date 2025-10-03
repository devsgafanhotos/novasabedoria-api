const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('funcionario', {
    id: {
      autoIncrement: true,
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true
    },
    nome: {
      type: DataTypes.STRING(255),
      allowNull: false
    },
    sobrenome: {
      type: DataTypes.STRING(255),
      allowNull: false
    },
    data_nascimento: {
      type: DataTypes.DATEONLY,
      allowNull: false
    },
    telefone: {
      type: DataTypes.STRING(20),
      allowNull: false
    },
    email: {
      type: DataTypes.STRING(255),
      allowNull: true,
      unique: "email"
    },
    sexo: {
      type: DataTypes.ENUM('Masculino','Feminino'),
      allowNull: false
    },
    bi: {
      type: DataTypes.STRING(255),
      allowNull: false,
      unique: "bi"
    },
    data_cadastro: {
      type: DataTypes.DATE,
      allowNull: true,
      defaultValue: Sequelize.Sequelize.literal('CURRENT_TIMESTAMP')
    },
    nome_pai: {
      type: DataTypes.STRING(255),
      allowNull: true
    },
    nome_mae: {
      type: DataTypes.STRING(255),
      allowNull: true
    },
    senha: {
      type: DataTypes.STRING(1000),
      allowNull: true
    },
    id_funcionario: {
      type: DataTypes.INTEGER,
      allowNull: true,
      references: {
        model: 'funcionario',
        key: 'id'
      }
    }
  }, {
    sequelize,
    tableName: 'funcionario',
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
        name: "bi",
        unique: true,
        using: "BTREE",
        fields: [
          { name: "bi" },
        ]
      },
      {
        name: "email",
        unique: true,
        using: "BTREE",
        fields: [
          { name: "email" },
        ]
      },
      {
        name: "id_funcionario",
        using: "BTREE",
        fields: [
          { name: "id_funcionario" },
        ]
      },
    ]
  });
};
