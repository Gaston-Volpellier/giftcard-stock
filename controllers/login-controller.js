import HttpError from '../models/http-error.js'
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'
import { Users } from '../models/Users.js'

export const signUp = async (req, res) => {
  const { name, lastname, email, password } = req.body

  const user = Users.findOne({
    where: {
      email: email,
    },
  })

  const foundUser = await user

  if (foundUser) {
    res.status(303).json('Email already exists.')
  } else {
    try {
      const hashedPassword = await bcrypt.hash(password, 10)
      Users.create({
        name: name,
        lastname: lastname,
        email: email,
        password: hashedPassword,
      }).then(() => {
        console.log('User registered.')
        res.status(200).json('Registration successful')
      })
    } catch (err) {
      console.log('Error saving user: ' + err)
      res.status(400).json(err)
    }
  }
}

export const login = async (req, res) => {
  const { email, password } = req.body
  const user = Users.findOne({
    where: {
      email: email,
    },
  })

  const foundUser = await user

  try {
    if (!foundUser) {
      const error = new HttpError(
        'Could not find any user with that email.',
        404,
      )
      throw error
    }

    if (await bcrypt.compare(password, foundUser.password)) {
      const data = {
        sub: foundUser.id,
        name: foundUser.name,
      }
      const token = jwt.sign(data, process.env.ACCESS_TOKEN_SECRET, {
        expiresIn: '2h',
      })

      // save token into user request headers.
      res.status(200).json({
        username: foundUser.name,
        email: foundUser.email,
        token: token,
      })
    } else {
      const error = new HttpError('Incorrect password.', 400)
      throw error
    }
  } catch (error) {
    console.error(error.code)
    res.json('Error logging in: ' + error)
  }
}

export const authenticateToken = (req, res, next) => {
  const token = req.headers['token']

  const verified = token && jwt.verify(token, process.env.ACCESS_TOKEN_SECRET)
  if (verified) {
    return next()
  } else {
    res.status(401).json({ error: 'Invalid access token.' })
  }
}
