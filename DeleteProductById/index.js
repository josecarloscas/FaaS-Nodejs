const { ObjectID } = require('mongodb')
const createMongoClient = require('../shared/mongo')

module.exports = async function (context, req) {
  const { id } = req.params

  if (!id) {
    context.res = {
      status: 400,
      body: 'Los campos son requeridos!'
    }

    return
  }

  const { db, connection } = await createMongoClient()

  const Products = db.collection('products')

  try {
    await Products.findOneAndDelete({ _id: ObjectID(id) })
    connection.close()
    context.res = {
      status: 204,
      body: 'El producto se elimino correctamente!'
    }
  } catch (error) {
    context.res = {
      status: 500,
      body: 'Ocurrio un error al eliminar el producto' + id
    }
  }
}