import express from 'express'
import { getMenu, showBrands } from '../models/menu.js'

export const router = express.Router()

router.get('/', getMenu)

router.get('/brands/:id', showBrands)
