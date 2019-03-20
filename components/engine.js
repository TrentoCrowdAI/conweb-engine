const puppeteer = require('puppeteer');
// This part we will probably load dynamically for all components
const list = require("./list");

exports.processIntent = async (request) => {

  const browser = await puppeteer.launch({ args: ['--no-sandbox'] });
  const page = await browser.newPage();

  try {
    await page.goto(request.url, {
      waitUntil: 'networkidle2'
    });

    var resp = await executeIntent(page, request);

    await browser.close();
  } catch (err) {
    console.log(err);
    await browser.close();
    return null;
  }

  return resp;
};

var executeIntent = async (page, request) => {

  if (request.component == "list"){
    return await list.executeIntent(page, request);
  } 
  
  return null;  
};
