module.exports=(objectPagination, productModel, query) => {
    if (query.page) {
        objectPagination.page = parseInt(query.page);
    }
    const totalPage = Math.ceil(productModel / objectPagination.limit);
    objectPagination.totalPage = totalPage;
    return objectPagination;
}