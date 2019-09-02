var Article = {
    'read_article': async (page, request) => {
        //Reads an article
        const query = request.query;

        var result = [];
        let haveAttribute;

        // we get the items
        for (var s = 0; s < query.resource.selector.item.length; s++) {
            var item = query.resource.selector.container + " " + query.resource.selector.item[s];
            if (query.resource.selector.container.includes("ul")) {
                item = query.resource.selector.container + " > " + query.resource.selector.item[s];
            }

            var artEl = await page.$$(item);

            // we iterate over the items and extract the attributes
            for (var i = 0; i < artEl.length; i++) {
                var item = artEl[i];
                var data = {};

                // we try to extract each of the attributes in the reference resource
                for (var j = 0; j < query.resource.attributes.length; j++) {
                    var attr = query.resource.attributes[j];

                    try {
                        if (!data[attr.name]) {
                            data[attr.name] = await item.$eval(attr.selector, item => item.innerText);
                        }
                    } catch (err) {
                        data[attr.name] = undefined;
                    }
                }
                result.push(data);
            }
        }

        return result;
    }

};


exports.executeIntent = async (page, request) => {
    var fn = Article[request.query.intent];
    if (!fn) return null;

    return await fn(page, request);
};
