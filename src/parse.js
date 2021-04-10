function parse(data, tags) {
    let root = data.documentElement;
    let children = root.childNodes;
    let itemArray = [];

    children.forEach( (child, childIndex) => {
        // Make a new dict for each child
        let  attrDict = {};
        tags.forEach(tag => {
            // Insert a tag:value pair for each tag
            attrDict[tag] = data.getElementsByTagName(tag)[childIndex].textContent;
        })
        // Add the dict to the main array
        itemArray.push(attrDict);
    })
  
    return itemArray;
}

export default parse;
