function parse(data, tags) {
    var root = data.documentElement;
    var children = root.childNodes;
    var itemArray = [];
    console.log(tags);
    children.forEach( (child, childIndex) => {
        let attrDict = {};
        tags.forEach(tag => {
            attrDict[tag] = data.getElementsByTagName(tag)[childIndex].textContent;
        })
        itemArray.push(attrDict);
    });
    return itemArray;
}

export default parse;
