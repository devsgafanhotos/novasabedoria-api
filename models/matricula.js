const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('matricula', {
    id: {
      autoIncrement: true,
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true
    },
    valor_matricula: {
      type: DataTypes.DECIMAL(8,2),
      allowNull: false
    },
    ano_lectivo: {
      type: DataTypes.STRING(255),
      allowNull: true
    },
    data_matricula: {
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
    id_disciplina: {
      type: DataTypes.INTEGER,
      allowNull: true,
      references: {
        model: 'disciplina',
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
    tableName: 'matricula',
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
        name: "id_disciplina",
        using: "BTREE",
        fields: [
          { name: "id_disciplina" },
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
        name: "id_plano",
        using: "BTREE",
        fields: [
          { name: "id_plano" },
        ]
      },
    ]
  });
};
