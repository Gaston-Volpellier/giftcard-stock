import express from 'express'
import { login, signUp } from '../controllers/login-controller.js'
import { loginValidation } from './validations/validations.js'

export const router = express.Router()

router.post('/signup', loginValidation, signUp)

router.post('/login', login)
