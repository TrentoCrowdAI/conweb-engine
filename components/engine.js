// This part we will probably load dynamically for all components
const list = require("./list");

exports.executeIntent = async (page, request) => {

  if (request.component == "list"){
    return await list.executeIntent(page, request);
  } 
  
  return null;  
};
