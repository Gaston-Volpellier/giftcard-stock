import express from 'express'
import {
  getBrands,
  getMenu,
  getUsers,
  updateUser,
} from '../controllers/menu-controller.js'
import { updateUser as updateUserValidation } from './validations/index.js'
export const router = express.Router()

router.get('/', getMenu)

router.get('/users/:id', getUsers)

router.post('/update', updateUserValidation, updateUser)

router.get('/brands', getBrands)
