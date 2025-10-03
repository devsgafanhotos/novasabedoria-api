const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('alocamentoAlunos', {
    id: {
      autoIncrement: true,
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true
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
    id_aluno: {
      type: DataTypes.INTEGER,
      allowNull: true,
      references: {
        model: 'aluno',
        key: 'id'
      }
    },
    id_turma: {
      type: DataTypes.INTEGER,
      allowNull: true,
      references: {
        model: 'turma',
        key: 'id'
      }
    },
    id_matricula: {
      type: DataTypes.INTEGER,
      allowNull: true,
      references: {
        model: 'matricula',
        key: 'id'
      }
    }
  }, {
    sequelize,
    tableName: 'alocamentoAlunos',
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
        name: "id_aluno",
        using: "BTREE",
        fields: [
          { name: "id_aluno" },
        ]
      },
      {
        name: "id_turma",
        using: "BTREE",
        fields: [
          { name: "id_turma" },
        ]
      },
      {
        name: "id_matricula",
        using: "BTREE",
        fields: [
          { name: "id_matricula" },
        ]
      },
    ]
  });
};
