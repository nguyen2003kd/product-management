module.exports=(products)=> {
    const listProducts = products.map((item) => {
        item.newPrice = (item.price * (100 - item.discountPercentage) / 100).toFixed(2);
        return item;
    });
    return listProducts;
}
