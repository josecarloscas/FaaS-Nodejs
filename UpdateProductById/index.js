const { ObjectID } = require('mongodb')
const createMongoClient = require('../shared/mongo')

module.exports = async function (context, req) {
  const { id } = req.params
  const product = req.body || {}

  if (!id || !product) {
    context.res = {
      status: 400,
      body: 'Los campos son obligatorios'
    }

    return
  }

  const { db, connection } = await createMongoClient()
  const Products = db.collection('products')

  try {
    const products = await Products.findOneAndUpdate(
      { _id: ObjectID(id) },
      { $set: product }
    )

    connection.close()

    context.res = {
      status: 200,
      body: products
    }
  } catch (error) {
    context.res = {
      status: 500,
      body: 'Error al actualizar el producto'
    }
  }
}