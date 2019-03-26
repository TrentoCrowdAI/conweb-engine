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

        let attributesNode = [];
        let temp = null;
        let attributes = [];

        // we try to extract each of the attributes in the reference resource
        for (var j = 0; j < query.resource.attributes.length; j++) {
          var attr = query.resource.attributes[j];
          data[attr.name] = [];

          try {
            //let array = await item.$eval(attr.selector, item => item.innerHTML);
            attributesNode = await item.$$(attr.selector);
            for (let k = 0; k < attributesNode.length; k++) {
              temp = await page.evaluate((obj) => { return obj.innerHTML; }, attributesNode[k]);
              //attributes.push(temp);
              data[attr.name].push(temp);
            }
            //console.log(attributes);
            //data[attr.name] = attributes;
            //console.log(data[attr.name]);
            attributes.length = 0;
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
              data[attr.name] = await item.$eval(attr.selector, item => item.innerHTML);
            } catch (err) {
              data[attr.name] = undefined;
            }
          }
          result++;
        }

        return result;
    },

    'list_sort': async (page, request) => { //TO BE IMPLEMENTED
        const query = request.query;

        // we get the items
        var liEl = await page.$$(query.resource.selector + " > li");

        var result = [];
        // we extract the sort-by-attribute
        var sortBy = query.resource.param_attr.name;
        var operation = query.resource.operation;

        // we iterate over the items and extract the attributes
        for (var i = 0; i < liEl.length; i++) {
          var item = liEl[i];
          var data = {};

          // we try to extract each of the attributes in the reference resource
          for (var j = 0; j < query.resource.attributes.length; j++) {
            var attr = query.resource.attributes[j];

            try {
              data[attr.name] = await item.$eval(attr.selector, item => item.innerHTML);
            } catch (err) {
              data[attr.name] = undefined;
            }
          }

          result.push(data);
        }

        /*waiting for opcode to decide if sort needs to be done descending/ascending
        or whatever, the different sorts will be moved in a switch accordingly*/

        result.sort(function (a, b) {
            return a[sortBy] < b[sortBy] ? -1 : a[sortBy] > b[sortBy] ? 1 : 0;
        }); //fails if the numbers have commas instead of dots

        if (operation == "descending")
        {
            result.reverse();
        }

        return result;
    },

    'list_filter': async () => {}

};


exports.executeIntent = async (page, request) => {
  var fn = List[request.query.intent];
  if (!fn) return null;

  return await fn(page, request);
};
