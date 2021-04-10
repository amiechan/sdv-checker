function parse(data, tags) {
    console.log("Parse data");

    var root = data.documentElement;
    var children = root.childNodes;
    var itemCount = children.length;
    var attrCount = tags.length;
    var itemArray = [];

    for (let i = 0; i < itemCount; i++) {
        var attr = {};

        for (let j = 0; j < attrCount; j++) {
            var attrName = tags[j];
            var attrValue = data.getElementsByTagName(attrName)[i].textContent;
            attr[attrName] = attrValue;
            // edit
        }

        itemArray.push({
            attr
        });
    }

    return itemArray;
}

export default parse;


