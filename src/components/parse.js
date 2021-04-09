export const parse = (list, data) => {
    var root = data.documentElement;
    var children = root.childNodes;
    console.log(children.length);
    var count = children.length;

    // new empty array to store parsed info
    var items = [];

    // For each child
    for (let i = 0; i < count; i++) {
        // Push a new array
        items.push(
            // Containing the textContent of each item in items
            list.map(item => {
                return data.getElementsByTagName(item)[i].textContent;
            })
        );
    }
    return items;
}

export default parse;