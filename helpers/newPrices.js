function newPrices(products) {
    const listProducts = products.map((item) => {
        item.newPrice = (item.price * (100 - item.discountPercentage) / 100).toFixed(2);
        return item;
    });
    return listProducts;
}
module.exports.newPrices = newPrices;

function newPrice(product) {
    product.newPrice=(product.price * (100 - product.discountPercentage) / 100).toFixed(2)
    return product;
}
module.exports.newPrice = newPrice;
