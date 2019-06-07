var List = {
    /**
    * List all resources
    */
    'list_resources': async (page, request) => {
        const query = request.query;

        // we get the items
        var result = [];

        for(var s = 0; s < query.resource.selector.item.length; s++)
        {
            var item = query.resource.selector.container + " " + query.resource.selector.item[s];

            var liEl = await page.$$(item);

            // we iterate over the items and extract the attributes
            for (var i = 0; i < liEl.length; i++) {
                var item = liEl[i];
                var data = {};

                // we try to extract each of the attributes in the reference resource
                for (var j = 0; j < query.resource.attributes.length; j++) {
                    var attr = query.resource.attributes[j];

                    try {
                        if(!data[attr.name])
                            data[attr.name] = await item.$eval(attr.selector, item => item.innerText);
                    } catch (err) {
                        data[attr.name] = undefined;
                    }
                }
                result.push(data);
            }
        }

        return result;
    },

    'list_count': async (page, request) => {
        const query = request.query;

        // we get the items
        var result = 0;

        for(var s = 0; s < query.resource.selector.item.length; s++)
        {
            var item = query.resource.selector.container + " " + query.resource.selector.item[s];

            var liEl = await page.$$(item);

            // we iterate over the items and extract the attributes
            for (var i = 0; i < liEl.length; i++) {
                var item = liEl[i];
                var data = {};

                // we try to extract each of the attributes in the reference resource
                for (var j = 0; j < query.resource.attributes.length; j++) {
                    var attr = query.resource.attributes[j];

                    try {
                        if(!data[attr.name])
                            data[attr.name] = await item.$eval(attr.selector, item => item.innerText);
                    } catch (err) {
                        data[attr.name] = undefined;
                    }
                }
                result++;
            }
        }

        return result;
    },

    'list_sort': async (page, request) => {
        const query = request.query;

        var result = [];

        // we extract the sort-by-attribute
        for(var j = 0; j < query.parameters.length; j++)
        {
            if (query.parameters[j].name == "attribute")
            {
                var sortBy = query.parameters[j].value[0];
            }
            else if (query.parameters[j].name.includes("sort_op"))
            {
                var operation = query.parameters[j].value;
            }
        }

        // we get the items
        for(var s = 0; s < query.resource.selector.item.length; s++)
        {
            var item = query.resource.selector.container + " " + query.resource.selector.item[s];

            var liEl = await page.$$(item);

            // we iterate over the items and extract the attributes
            for (var i = 0; i < liEl.length; i++) {
                var item = liEl[i];
                var data = {};

                // we try to extract each of the attributes in the reference resource
                for (var j = 0; j < query.resource.attributes.length; j++) {
                    var attr = query.resource.attributes[j];

                    try {
                        if(!data[attr.name])
                            data[attr.name] = await item.$eval(attr.selector, item => item.innerText);
                    } catch (err) {
                        data[attr.name] = undefined;
                    }
                }

                result.push(data);
            }

    }

        if (operation != "noop")
        {
            result.sort(function (a, b)
            {
                return a[sortBy] < b[sortBy] ? -1 : 1;
            });
        } //fails if the numbers have commas instead of dots

        if (operation == "descending" || operation == "reverse")
        {
            result.reverse();
        }

        return result;
    },

    'list_filter': async (page, request) => {
        const query = request.query;

        var result = [];

        // we extract the sort-by-attribute
        for(var j = 0; j < query.parameters.length; j++)
        {
            if (query.parameters[j].name == "attribute")
            {
                var filterBy = query.parameters[j].value[0];
            }
            else if (query.parameters[j].name == "attr-value")
            {
                var filterValue = query.parameters[j].value;
            }
            else if (query.parameters[j].name.includes("filter_op"))
            {
                var operation = query.parameters[j].value;
            }
        }

        // we get the items
        for(var s = 0; s < query.resource.selector.item.length; s++)
        {
            var item = query.resource.selector.container + " " + query.resource.selector.item[s];

            var liEl = await page.$$(item);

            // we iterate over the items and extract the attributes
            for (var i = 0; i < liEl.length; i++) {
                var item = liEl[i];
                var data = {};

                // we try to extract each of the attributes in the reference resource
                for (var j = 0; j < query.resource.attributes.length; j++) {
                    var attr = query.resource.attributes[j];

                    try {
                        if(!data[attr.name])
                            data[attr.name] = await item.$eval(attr.selector, item => item.innerText);
                    } catch (err) {
                        data[attr.name] = undefined;
                    }
                }

                switch (operation) {
                    case "less":
                    if (data[filterBy] < filterValue)
                    {
                        result.push(data);
                    }
                    break;
                    case "let":
                    if (data[filterBy] <= filterValue)
                    {
                        result.push(data);
                    }
                    break;
                    case "greater":
                    if (data[filterBy] > filterValue)
                    {
                        result.push(data);
                    }
                    break;
                    case "get":
                    if (data[filterBy] >= filterValue)
                    {
                        result.push(data);
                    }
                    break;
                    case "different":
                    if (data[filterBy] != filterValue)
                    {
                        result.push(data);
                    }
                    break;
                    case "equals":
                    if (data[filterBy] == filterValue)
                    {
                        result.push(data);
                    }
                    break;
                }
            }
        }

        return result;
    },

    'list_about': async (page, request) => {
        const query = request.query;

        var result = [];

        // we get the items
        for(var s = 0; s < query.resource.selector.item.length; s++)
        {
            var item = query.resource.selector.container + " " + query.resource.selector.item[s];

            var liEl = await page.$$(item);

            // we iterate over the items and extract the attributes
            try {
                for (var j = 0; j < query.resource.attributes.length; j++) {
                    var attr = query.resource.attributes[j];
                    if (!result.includes(attr.name))
                    {
                        result.push(attr.name);
                    }
                }
            }
            catch (err)
            {
                result = {}
            }
        }

        return result;
    },

    'list_summary': async (page, request) => {
        //Summarizes a list, NOTE: only working with only and remove as op codes
        const query = request.query;

        // we extract the to be summarized attribute
        for(var j = 0; j < query.parameters.length; j++)
        {
            if (query.parameters[j].name == "attribute")
            {
                var summarizeBy = query.parameters[j].value;
            }
            else if (query.parameters[j].name.includes("summary_op"))
            {
                var operation = query.parameters[j].value;
            }
        }

        var result = [];

        // we get the items
        for(var s = 0; s < query.resource.selector.item.length; s++)
        {
            var item = query.resource.selector.container + " " + query.resource.selector.item[s];

            var liEl = await page.$$(item);

            // we iterate over the items and extract the attributes
            for (var i = 0; i < liEl.length; i++) {
                var item = liEl[i];
                var data = {};

                // we try to extract each of the attributes in the reference resource
                for (var j = 0; j < query.resource.attributes.length; j++) {
                    var attr = query.resource.attributes[j];

                    try {
                        if(!data[attr.name])
                            data[attr.name] = await item.$eval(attr.selector, item => item.innerText);
                    } catch (err) {
                        data[attr.name] = undefined;
                    }
                }

                switch (operation) {
                    case "only":
                    var temp = {}
                    summarizeBy.forEach(function(summarizeAttr) {
                        Object.keys(data).forEach(function(key) {
                            // key: the name of the object property
                            if(key == summarizeAttr)
                            {
                                temp.key = data[key];
                            }
                        });
                    });
                    result.push(temp);
                    break;
                    case "remove":
                    summarizeBy.forEach(function(summarizeAttr) {
                        delete data[summarizeAttr];
                    });
                    result.push(data);
                    break;
                }
            }
        }

        return result;
    }

};


exports.executeIntent = async (page, request) => {
    var fn = List[request.query.intent];
    if (!fn) return null;

    return await fn(page, request);
};
