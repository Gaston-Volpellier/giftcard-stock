import HttpError from '../models/http-error.js'
import bcrypt from 'bcrypt'
import { Users } from '../models/Users.js'

export const getMenu = (req, res) => {
  res.status(200).send('<h1>Menu page<h1>')
}

export const getUsers = (req, res) => {
  Users.findByPk(req.params.id)
    .then((user) => {
      if (!user) {
        const error = new HttpError(
          'Could not find any user with that ID.',
          404,
        )
        throw error
      }
      res.status(200).json(user)
    })
    .catch((error) => {
      console.log('Error getUsers: ' + error)
      res.status(400).json(error)
    })
}

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

export const updateUser = async (req, res) => {
  const { id, name, lastname, adress, email, city, phone } = req.body

  await Users.update(
    {
      name: name,
      lastname: lastname,
      adress: adress,
      city: city,
      phone: phone,
      email: email,
    },
    {
      where: {
        id: id,
      },
    },
  )
    .then((result) => {
      console.log('User updated.')
      res.status(200).json(result)
    })
    .catch((err) => {
      console.log('Error updating user: ' + err)
      res.status(400).json(err)
    })
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
      res.status(200).json({ username: foundUser.name, email: foundUser.email })
    } else {
      const error = new HttpError('Incorrect password.', 400)
      throw error
    }
  } catch (error) {
    console.error(error.code)
    res.json('Error logging in: ' + error)
  }
}
