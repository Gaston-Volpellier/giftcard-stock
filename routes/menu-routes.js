import express from 'express'
import {
  getBrands,
  getMenu,
  getUsers,
  updateUser,
} from '../controllers/menu-controller.js'

export const router = express.Router()

router.get('/', getMenu)

router.get('/users/:id', getUsers)

router.post('/update', updateUser)

router.get('/brands', getBrands)
