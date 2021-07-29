const getProductAttribute = async (fetchProduct, selector) => {
  return await fetchProduct.evaluate((product, selector) => {
    return product.querySelector(selector)?.innerText
  }, selector)
}

module.exports = getProductAttribute
