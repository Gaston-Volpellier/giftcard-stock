import { Giftcards } from '../models/Giftcards.js'

export const getGiftcard = async (req, res) => {
  const coupon = Giftcards.findOne({
    where: {
      unico: req.params.unico,
    },
  })

  const foundCoupon = await coupon

  if (!foundCoupon) {
    res.status(400).json({ error: 'Giftcard not found.' })
  } else {
    const {
      unico,
      fecha_creacion,
      vencimiento,
      mensaje,
      telefonopara,
    } = foundCoupon
    res.status(200).json({
      unico: unico,
      fecha_creacion: fecha_creacion,
      vencimiento: vencimiento,
      mensaje: mensaje,
      telefonopara: telefonopara,
    })
  }
}
