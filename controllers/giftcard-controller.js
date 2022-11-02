import { Giftcards } from '../models/Giftcards.js'

export const getGiftcard = async (req, res) => {
  const giftcard = Giftcards.findOne({
    where: {
      unico: req.params.unico,
    },
  })

  const foundGiftcard = await giftcard

  if (!foundGiftcard) {
    res.status(400).json({ error: 'Giftcard not found.' })
  } else {
    const {
      unico,
      fecha_creacion,
      vencimiento,
      mensaje,
      telefonopara,
    } = foundGiftcard
    res.status(200).json({
      unico: unico,
      fecha_creacion: fecha_creacion,
      vencimiento: vencimiento,
      mensaje: mensaje,
      telefonopara: telefonopara,
    })
  }
}
