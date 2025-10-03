const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('despesa', {
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true
    },
    descricao: {
      type: DataTypes.TEXT,
      allowNull: true
    },
    tipo_despesa: {
      type: DataTypes.STRING(255),
      allowNull: true
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
    id_funcionario: {
      type: DataTypes.INTEGER,
      allowNull: true,
      references: {
        model: 'funcionario',
        key: 'id'
      }
    },
    id_funcionario_pago: {
      type: DataTypes.INTEGER,
      allowNull: true,
      references: {
        model: 'funcionario',
        key: 'id'
      }
    }
  }, {
    sequelize,
    tableName: 'despesa',
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
        name: "id_funcionario_pago",
        using: "BTREE",
        fields: [
          { name: "id_funcionario_pago" },
        ]
      },
    ]
  });
};
