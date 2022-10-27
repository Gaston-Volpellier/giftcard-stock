import express from 'express'
import {
  getMenu,
  getUsers,
  login,
  signUp,
  updateUser,
} from '../controllers/menu-controller.js'

export const router = express.Router()

router.get('/', getMenu)

router.get('/users/:id', getUsers)

router.post('/signup', signUp)

router.post('/login', login)

router.post('/update', updateUser)
