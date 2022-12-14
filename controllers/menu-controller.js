import { Users } from '../models/Users.js'
import { Brands } from '../models/Brands.js'
import dbConnect from './server-controller.js'

export const getMenu = (req, res) => {
  res.status(200).send('<h2>Menu page<h2>')
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

export const getUsers = async (req, res, next) => {
  const user = await Users.findByPk(req.params.id).catch((error) => {
    return next(error)
  })

  if (!user) {
    return res.status(404).send({ message: 'User not found.' })
  }

  return res.status(200).send(user)
}

export const updateUser = async (req, res) => {
  const { id, name, lastname, adress, email, city, phone } = req.body

  await Users.update(
    {
      name,
      lastname,
      adress,
      city,
      phone,
      email,
    },
    {
      where: {
        id,
      },
      returning: true,
      plain: true,
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
