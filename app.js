const puppeteer = require('puppeteer');
const https = require('https');
var express = require('express');
var app = express();

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

(async () => {
    const browser = await puppeteer.launch();
    const page = await browser.newPage();
    await page.goto(url, {waitUntil: 'networkidle2'});
    const innerText = await page.evaluate(() => document.querySelector('li').innerText);

    if (innerText != null)
    {
        console.log(innerText);
    }
    else
    {
        console.log("No lists in this webpage!");
    }

    await browser.close();
})();
