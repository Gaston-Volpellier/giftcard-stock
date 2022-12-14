import { body } from 'express-validator'
import { ValidatorHandler } from './validation-handler'

export const updateUser = [
  body('id').not().isEmpty(),
  body('name').isLength({ min: 2 }),
  body('lastname').isLength({ min: 2 }),
  body('email').isEmail().normalizeEmail(),
  ValidatorHandler,
]

export const loginValidation = [
  body('name').isLength({ min: 2 }),
  body('lastname').isLength({ min: 2 }),
  body('password').isLength({ min: 5 }),
  body('email').normalizeEmail().isEmail(),
  ValidatorHandler,
]
