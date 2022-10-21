import express from 'express'
import {
  addBrand,
  getMenu,
  showBrands,
} from '../controllers/menu-controller.js'

export const router = express.Router()

router.get('/', getMenu)

router.get('/brands/:id', showBrands)

router.post('/', addBrand)
