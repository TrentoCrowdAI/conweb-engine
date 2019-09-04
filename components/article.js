var Article = {
    'article_read': async (page, request) => {
        //Reads an article
        const query = request.query;

        var result = [];
        var data = {};

        const title = await page.$(query.resource.selector);
        const titleText = await page.evaluate(title => title.innerText, title);
        data["title"] = titleText;

        for(var i = 0; i < query.resource.attributes.length; i++)
        {
            try {
                const article = await page.$(query.resource.attributes[i]);
                const articleText = await page.evaluate(article => article.innerText, article);
                data["body"] = articleText;
            } catch (err) {
                continue;
            }
        }
        result.push(data);

        return result;
    },

    'article_sum': async (page, request) => {
        //Reads an article
        const query = request.query;

        var result = [];
        var data = {};

        const title = await page.$(query.resource.selector);
        const titleText = await page.evaluate(title => title.innerText, title);
        data["title"] = titleText;

        for(var i = 0; i < query.resource.attributes.length; i++)
        {
            try {
                const article = await page.$(query.resource.attributes[i]);
                const articleText = await page.evaluate(article => article.innerText, article);
                data["body"] = articleText.substring(0, 800) + "...";
            } catch (err) {
                continue;
            }
        }
        result.push(data);

        return result;
    },

};


exports.executeIntent = async (page, request) => {
    var fn = Article[request.query.intent];
    if (!fn) return null;

    return await fn(page, request);
};
