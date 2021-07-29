const getProducts = require('../utility/getProducts')

const products_get = async (req, res) => {
  const { q } = req.query

  const products = await getProducts(q)

  res.send(products)
}

module.exports = {
  products_get,
}
