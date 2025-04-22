module.exports = (query) => {
    let objectSearch = {
        search: '',
    }
    if(query.search){
        const regex = new RegExp(query.search, 'i');
        objectSearch.search=query.search;
        objectSearch.title=regex;
}
    return objectSearch;
}