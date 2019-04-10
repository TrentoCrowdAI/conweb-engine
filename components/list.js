var List = {
    /**
    * List all resources
    */
    'list_resources': async (page, request) => {
        const query = request.query;

        // we get the items
        var liEl = await page.$$(query.resource.selector + " > li");

        var result = [];

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

        return result;
    },

    'list_count': async (page, request) => {
        const query = request.query;

        // we get the items
        var liEl = await page.$$(query.resource.selector + " > li");

        var result = 0;

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

        return result;
    },

    'list_sort': async (page, request) => {
        const query = request.query;

        // we get the items
        var liEl = await page.$$(query.resource.selector + " > li");
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

        if (operation != "noop" && operation != "reverse")
        {
            result.sort(function (a, b)
            {
                return a[sortBy] < b[sortBy] ? -1 : a[sortBy] > b[sortBy] ? 1 : 0;
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

        // we get the items
        var liEl = await page.$$(query.resource.selector + " > li");

        var result = [];
        // we extract the sort-by-attribute
        for(var j = 0; j < query.parameters.length; j++)
        {
            if (query.parameters[j].name == "attribute")
            {
                var filterBy = query.parameters[j].label;
                var filterValue = query.parameters[j].value;
            }
            else if (query.parameters[j].name == "filter_type")
            {
                var operation = query.parameters[j].value;
            }
        }

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

            switch (operation) {
                case "lt":
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
                case "gt":
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

        return result;
    }

};


exports.executeIntent = async (page, request) => {
    var fn = List[request.query.intent];
    if (!fn) return null;

    return await fn(page, request);
};
