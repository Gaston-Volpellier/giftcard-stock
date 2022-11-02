import { Sequelize } from 'sequelize'
import db from '../db/connection.js'

export const Brands = db.define(
  'Brand',
  {
    codigo: {
      type: Sequelize.INTEGER,
      autoIncrement: true,
      allowNull: false,
      primaryKey: true,
    },
    nombre: {
      type: Sequelize.STRING,
      allowNull: true,
    },
    empresastock: {
      type: Sequelize.INTEGER,
      allowNull: true,
    },
    estado: {
      type: Sequelize.INTEGER,
      allowNull: true,
    },
    fee: {
      type: Sequelize.REAL,
      allowNull: true,
    },
    porcentaje: {
      type: Sequelize.REAL,
      allowNull: true,
    },
    logo: {
      type: Sequelize.STRING,
      allowNull: true,
    },
    vencimiento: {
      type: Sequelize.INTEGER,
      allowNull: true,
    },
  },
  {
    tableName: 'empresa',
    timestamps: false,
  },
)
