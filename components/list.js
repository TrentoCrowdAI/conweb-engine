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
                var sortBy = query.parameters[j].value;
            }
            else if (query.parameters[j].name == "sort_type")
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
        //TOBEFIXED
        const query = request.query;

        var result = [];

        // we extract the sort-by-attribute
        /*
        Problema, ora la logica funziona in modo che attribute sia il name, e non il selector,
        non so cosa mi viene passato per andarlo a prendere tuttavia.
        */
        for(var j = 0; j < query.parameters.length; j++)
        {
            if (query.parameters[j].name == "attribute")
            {
                var filterByAttribute = query.parameters[j].value;
                var filterBy = null;
            }
            else if (query.parameters[j].name == "attr-value")
            {
                var filterValue = query.parameters[j].value;
            }
            else if (query.parameters[j].name == "filter_op")
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
                        data[attr.name] = await item.$eval(attr.selector, item => item.innerText);
                        if(attr.selector == filterByAttribute)
                        {
                            filterBy = attr.name;
                        }
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
        /*
        Attualmente ritorna un set, altrimenti avrebbe valori duplicati perchè cerca
        da due bot-item diversi, da discutere se va bene.
        */
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
                    result.push(attr.name);
                }
            }
            catch (err)
            {
                result = {}
            }
        }

        return [new Set(result)];
    },

    'list_summary': async (page, request) => {
        //Summarizes a list, NOTE: only working with only and remove as op codes
        const query = request.query;

        // we extract the to be summarized attribute
        for(var j = 0; j < query.parameters.length; j++)
        {
            if (query.parameters[j].name == "attribute")
            {
                /*
                Needs this thing, because it's the same as list_filter,
                we have to decide what is going to be passed from the object,
                wheter it's the name of the attribute, or the selector.
                */
                var summarizeByAttribute = query.parameters[j].value;
                var summarizeBy = [];
            }
            else if (query.parameters[j].name == "summary_op")
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
                        data[attr.name] = await item.$eval(attr.selector, item => item.innerText);
                        for(var q = 0; q < summarizeByAttribute.length; q++)
                        {
                            if(attr.selector == summarizeByAttribute[q])
                            {
                                summarizeBy.push(attr.name);
                            }
                        }
                    } catch (err) {
                        data[attr.name] = undefined;
                    }
                }

                switch (operation) {
                    case "only":
                    var temp = []
                    summarizeBy.forEach(function(summarizeAttr) {
                        Object.keys(data).forEach(function(key) {
                            // key: the name of the object property
                            if(key == summarizeAttr)
                            {
                                temp[key] = data[key];
                            }
                        });
                    });
                    result.push(temp);
                    break;
                    case "remove":
                    var temp = []
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
