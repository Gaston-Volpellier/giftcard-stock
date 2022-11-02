import HttpError from '../models/http-error.js'
import { Users } from '../models/Users.js'
import { Brands } from '../models/Brands.js'
import dbConnect from './server-controller.js'

export const getMenu = (req, res) => {
  res.status(200).send('<h1>Menu page<h1>')
}

export const getBrands = async (req, res, next) => {
  const brands = Brands.findAll({
    where: {
      estado: 1,
    },
  })

  try {
    res.json(await brands)
  } catch {
    res.json({ error: 'Could not find brands.' })
  }
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
