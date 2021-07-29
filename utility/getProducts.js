const puppeteer = require('puppeteer')
const getProductAttribute = require('./getProductAttribute')

const getProducts = async query => {
  const products = []

  const browser = await puppeteer.launch({
    headless: true,
  })

  const page = await browser.newPage()

  await page.setUserAgent(
    'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/61.0.3163.100 Safari/537.36',
  )

  await page.goto(`https://www.carrefour.fr/s?q=${query}`)

  const isUnderMaintenance = await page.evaluate(() => {
    return document.body.innerText.includes(
      'Nous sommes désolés de ce contre-temps, rassurez-vous, votre site sera bientôt de retour !',
    )
  })

  if (isUnderMaintenance) {
    throw new Error('Carrefour is under maintenance')
  }

  const fetchedProducts = await page.$$(
    '.pagination + #data-plp_produits > [class="product-grid-item"]',
  )

  for (const fetchedProduct of fetchedProducts) {
    const title = await getProductAttribute(fetchedProduct, '.ds-title--medium')

    const price = await getProductAttribute(
      fetchedProduct,
      '.product-card-price__price--final',
    )
    const unitPrice = await getProductAttribute(
      fetchedProduct,
      '.ds-product-card__perunitlabel',
    )
    const unit = await getProductAttribute(
      fetchedProduct,
      '.ds-format.ds-product-card__shimzone--small',
    )

    const product = {
      title,
      price,
      unitPrice,
      unit,
    }

    products.push(product)
  }

  await browser.close()

  return products
}

module.exports = getProducts
