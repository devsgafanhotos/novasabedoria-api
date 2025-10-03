const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('nota', {
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
    valor_nota: {
      type: DataTypes.DECIMAL(4,2),
      allowNull: true
    },
    tipo_nota: {
      type: DataTypes.STRING(255),
      allowNull: true
    },
    trimestre: {
      type: DataTypes.ENUM('I Trimestre','II Trimestre','III Trimestre'),
      allowNull: true
    },
    data_lancamento: {
      type: DataTypes.DATE,
      allowNull: true,
      defaultValue: Sequelize.Sequelize.literal('CURRENT_TIMESTAMP')
    },
    id_matricula: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'matricula',
        key: 'id'
      }
    },
    id_funcionario: {
      type: DataTypes.INTEGER,
      allowNull: true,
      references: {
        model: 'funcionario',
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
    id_aluno: {
      type: DataTypes.INTEGER,
      allowNull: true,
      references: {
        model: 'aluno',
        key: 'id'
      }
    }
  }, {
    sequelize,
    tableName: 'nota',
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
        name: "id_matricula",
        using: "BTREE",
        fields: [
          { name: "id_matricula" },
        ]
      },
      {
        name: "id_funcionario",
        using: "BTREE",
        fields: [
          { name: "id_funcionario" },
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
        name: "id_aluno",
        using: "BTREE",
        fields: [
          { name: "id_aluno" },
        ]
      },
    ]
  });
};
