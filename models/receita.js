const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('receita', {
    id: {
      autoIncrement: true,
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true
    },
    tipo_receita: {
      type: DataTypes.STRING(255),
      allowNull: false
    },
    mes_correspondente: {
      type: DataTypes.STRING(255),
      allowNull: true
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
    descricao: {
      type: DataTypes.TEXT,
      allowNull: true
    },
    id_funcionario: {
      type: DataTypes.INTEGER,
      allowNull: true,
      references: {
        model: 'funcionario',
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
    tableName: 'receita',
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
        name: "id_funcionario",
        using: "BTREE",
        fields: [
          { name: "id_funcionario" },
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
