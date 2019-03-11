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
            data[attr.name] = await item.$eval(attr.selector, item => item.innerHTML);
          } catch (err) {
            data[attr.name] = undefined;
          }
        }
        result.push(data);
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
