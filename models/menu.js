import dbConnect from './server.js'
import HttpError from './http-error.js'

const DUMMY_BRANDS = [
  {
    id: '1',
    name: 'Levis',
    description: 'Jeans and shirts',
    country: 'US',
  },
  {
    id: '2',
    name: 'Under armour',
    description: 'Sportswear',
    country: 'UK',
  },
  {
    id: '3',
    name: 'YSL',
    description: 'Formal clothes',
    country: 'FR',
  },
]

export const getMenu = (req, res) => {
  res.status(200).send('<h1>Menu page<h1>')
}

export const showBrands = (req, res) => {
  const brandId = req.params.id
  const brand = DUMMY_BRANDS.find((b) => {
    return b.id === brandId
  })

  if (!brand) {
    const error = new HttpError('Could not find a Brand with that ID.', 404)
    throw error
  }

  res.status(200).json({ brand })
}
