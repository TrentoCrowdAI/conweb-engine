const puppeteer = require('puppeteer');

const engine = require('./components/engine');

/*jquery library to be loaded
start with lists of proposals
input: javascript object with:
- intent (what the user wants to do, eg: list_resources)
- component (what I'm working with)
- resource (which specific list, eg: proposals)
- selector (specific is, eg: ul.list)
to be searched with specific bot-attribute tags OR, if they're standard, with their standard attribute e.g. h1, etc
then it returns a .json with attribue:value pairs, for now only on lists, but we need to think about other components like for forms
include a snapshot of how the list looks in the browser for every interaction. Convert the -bmp to base64 so that we don't store them, but just render when requested
<mimetype> <base64_encoed_image>*/

var url;

if (process.argv.length < 3) {
  console.log("Usage:   node index.js url");
  console.log("Example: node index.js https://nodejs.org/api/url.html");
} else {
  url = process.argv[2];
}

var processIntent = async (request) => {

  const browser = await puppeteer.launch({ args: ['--no-sandbox'] });
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


/*var request = {
  url: "file:///home/matteo/Uni/Tirocinio/conweb-engine/testPage.html",
  component: "list",
  query: {
    intent : "list_resources",
    resource : {
      name : "movies",
      selector : "ul",
      attributes : [{
        name : "title",
        selector : "h1"
      },{
        name : "stars",
        selector : "[bot-attribute=stars]"
      },{
        name : "plot",
        selector : "[bot-attribute=plot]"
      }]
    }
  }
};


var request = {
  url: "file:///home/matteo/Uni/Tirocinio/conweb-engine/testPage.html",
  component: "list",
  query: {
    intent : "list_count",
    resource : {
      name : "movies",
      selector : "ul",
      attributes : [{
        name : "title",
        selector : "h1"
      },{
        name : "stars",
        selector : "[bot-attribute=stars]"
      },{
        name : "plot",
        selector : "[bot-attribute=plot]"
      }]
    }
  }
};


var request = {
  url: "file:///home/matteo/Uni/Tirocinio/conweb-engine/testPage.html",
  component: "list",
  query: {
    intent : "list_sort",
    resource : {
      name : "movies",
      selector : "ul",
      param_attr : {
        name : "stars",
        selector : "[bot-attribute=length]"
      },
      operation : "ascending",
      attributes : [{
        name : "title",
        selector : "h1"
      },{
        name : "stars",
        selector : "[bot-attribute=stars]"
      },{
        name : "plot",
        selector : "[bot-attribute=plot]"
    },{
        name : "length",
        selector : "[bot-attribute=length]"
    }]
    }
  }
};*/


try {
  processIntent(request).then(res => console.log(res));
} catch (err) {

  console.log("Error========");
  console.log(err);
}
