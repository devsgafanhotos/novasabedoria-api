const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('turma', {
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
    numero_alunos: {
      type: DataTypes.INTEGER,
      allowNull: true
    },
    numero_vagas: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    numero_sala: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    periodo: {
      type: DataTypes.ENUM('Manhã','Tarde'),
      allowNull: false
    },
    ano_lectivo: {
      type: DataTypes.STRING(255),
      allowNull: true
    },
    data_cadastro: {
      type: DataTypes.DATE,
      allowNull: true,
      defaultValue: Sequelize.Sequelize.literal('CURRENT_TIMESTAMP')
    },
    id_plano: {
      type: DataTypes.INTEGER,
      allowNull: true,
      references: {
        model: 'plano',
        key: 'id'
      }
    }
  }, {
    sequelize,
    tableName: 'turma',
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
        name: "id_plano",
        using: "BTREE",
        fields: [
          { name: "id_plano" },
        ]
      },
    ]
  });
};
