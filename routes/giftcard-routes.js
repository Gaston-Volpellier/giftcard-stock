import express from 'express'
import { getGiftcard } from '../controllers/giftcard-controller.js'

export const router = express.Router()

router.get('/giftcard/:unico', getGiftcard)
