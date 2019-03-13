const puppeteer = require('puppeteer');
const engine = require('./components/engine');



exports.processIntent = async (request) => {

  const browser = await puppeteer.launch();
  const page = await browser.newPage();

  try {
    await page.goto(request.url, {
      waitUntil: 'networkidle2'
    });

    var resp = await engine.executeIntent(page, request);

    await browser.close();
  } catch (err) {
    console.log(err);
    await browser.close();
    return null;
  }

  return resp;
};