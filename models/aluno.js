const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('aluno', {
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
    sexo: {
      type: DataTypes.ENUM('Masculino','Feminino'),
      allowNull: false
    },
    bi: {
      type: DataTypes.STRING(255),
      allowNull: true,
      unique: "bi"
    },
    nome_encarregado: {
      type: DataTypes.STRING(255),
      allowNull: true
    },
    nome_pai: {
      type: DataTypes.STRING(255),
      allowNull: false
    },
    nome_mae: {
      type: DataTypes.STRING(255),
      allowNull: false
    },
    telefone: {
      type: DataTypes.STRING(255),
      allowNull: true
    },
    email: {
      type: DataTypes.STRING(255),
      allowNull: true
    },
    senha: {
      type: DataTypes.STRING(1000),
      allowNull: true
    },
    id_funcionario: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'funcionario',
        key: 'id'
      }
    }
  }, {
    sequelize,
    tableName: 'aluno',
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
        name: "id_funcionario",
        using: "BTREE",
        fields: [
          { name: "id_funcionario" },
        ]
      },
    ]
  });
};
