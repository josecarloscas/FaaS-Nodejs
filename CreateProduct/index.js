const createMongoClient = require('../shared/mongo');

module.exports = async function (context, req) {
  const product= req.body || {}

  if (product) {
    context.res = {
      status: 400,
      body: 'Los datos del producto son requeridos! '
    }
  }

  const { db, connection } = await createMongoClient()

  const products = db.collection('products')

  try {
    const products = await products.insert(product)
    connection.close()

    context.res = {
      status: 201,
      body: products.ops[0]
    }
  } catch (error) {
    context.res = {
      status: 500,
      body: 'No se pudo crear un nuevo producto'
    }
  }
}