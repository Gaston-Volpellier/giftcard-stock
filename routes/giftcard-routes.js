import express from 'express'
import { getGiftcard } from '../controllers/giftcard-controller.js'
import { authenticateToken } from '../controllers/login-controller.js'

export const router = express.Router()

router.get('/giftcard/:unico', authenticateToken, getGiftcard)
