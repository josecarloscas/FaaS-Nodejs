const { ObjectID } = require('mongodb')
const createMongoClient = require('../shared/mongo')

module.exports = async function (context, req) {
  const { id } = req.params

  if (!id) {
    context.res = {
      status: 400,
      body: 'Ingresa un ID de producto valido!'
    }

    return
  }

  const { db, connection } = await createMongoClient()

  const Products = db.collection('products')

  try {
    const body = await Products.findOne({ _id: ObjectID(id) })

    connection.close()
    context.res = {
      status: 200,
      body
    }
  } catch (error) {
    context.res = {
      status: 500,
      body: 'Error al listar producto por ID.'
    }
  }
}