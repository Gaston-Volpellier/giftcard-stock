import express from 'express'
import { login, signUp } from '../controllers/login-controller.js'

export const router = express.Router()

router.post('/signup', signUp)

router.post('/login', login)
