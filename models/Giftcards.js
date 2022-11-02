import { Sequelize } from 'sequelize'
import db from '../db/connection.js'

export const Giftcards = db.define(
  'Giftcard',
  {
    codigo: {
      type: Sequelize.INTEGER,
      autoIncrement: true,
      allowNull: false,
      primaryKey: true,
    },
    unico: {
      type: Sequelize.STRING,
      allowNull: true,
    },
    fecha_creacion: {
      type: Sequelize.DATE,
      allowNull: true,
    },
    empresa: {
      type: Sequelize.INTEGER,
      allowNull: true,
    },
    mensaje: {
      type: Sequelize.STRING,
      allowNull: true,
    },
    cliente_para: {
      type: Sequelize.STRING,
      allowNull: true,
    },
    vencimiento: {
      type: Sequelize.DATE,
      allowNull: true,
    },
    usada: {
      type: Sequelize.INTEGER,
      allowNull: true,
    },
    telefonode: {
      type: Sequelize.STRING,
      allowNull: true,
    },
    telefonopara: {
      type: Sequelize.STRING,
      allowNull: true,
    },
    estado: {
      type: Sequelize.INTEGER,
      allowNull: true,
    },
  },
  {
    tableName: 'giftcard',
    timestamps: false,
  },
)
