function creatTree(arr, parentId = "") {
    let tree = [];
    arr.forEach((item) => {
        if (item.parent_id === parentId) {
            let newItem = item;
            let Children = creatTree(arr, item.id);
            if (Children.length > 0) {
                newItem.children = Children;
            }
            tree.push(newItem);
        }
    });
    return tree;
}
module.exports.creatTree = creatTree;