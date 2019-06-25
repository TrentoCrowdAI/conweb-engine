var Form = {
    /**
    * fill a form
    */
    'fill_form': async (page, request) => {
        const query = request.query;
        for(var i = 0; i < query.resource.attributes.length; i++)
        {
            var selector = query.resource.attributes[i].selector;
            var type = query.resource.attributes[i].type;
            var id = query.resource.attributes[i].id;
            var value = query.resource.attributes[i].value;
            await page.focus(selector);
            switch (type)
            {
                case 'text':
                    await page.keyboard.type(value);
                    break;
                case 'select':
                    await page.select(type + "#" + id, value)
                    break;
                case 'radio':
                    await page.evaluate((selector) => document.querySelector(selector).click(), selector);
                    break;
                case 'checkbox':
                    await page.evaluate((selector) => document.querySelector(selector).click(), selector);
                    break;
            }
        }
        // captures a screenshot
        await page.screenshot({ path: 'proof.png' });
        console.log ('done');
    }
};


exports.executeIntent = async (page, request) => {
    var fn = Form[request.query.intent];
    if (!fn) return null;

    return await fn(page, request);
};
