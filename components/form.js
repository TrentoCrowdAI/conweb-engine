var Form = {
    /**
    * fill a form
    */
    'fill_form': async (page, request) => {
        const query = request.query;

        //Array to be returned to check items
        var result = [];

        for(var i = 0; i < query.resource.attributes.length; i++)
        {
            var data = {};

            try {
                var selector = query.resource.attributes[i].selector;
                var type = query.resource.attributes[i].type;
                var formSelector = query.resource.selector.container; //Per ora usato solo per submit

                await page.focus(selector);

                switch (type)
                {
                    case 'text':
                        var value = query.resource.attributes[i].value;
                        await page.keyboard.type(value);
                        break;
                    case 'select':
                        var id = query.resource.attributes[i].id;
                        var value = query.resource.attributes[i].value;
                        await page.select(type + "#" + id, value)
                        break;
                    case 'radio':
                        await page.evaluate((selector) => document.querySelector(selector).click(), selector);
                        break;
                    case 'checkbox':
                        await page.evaluate((selector) => document.querySelector(selector).click(), selector);
                        break;
                }
                data[selector] = 'ok';
            } catch (err)
            {
                data[selector] = 'missing';
            }

            result.push(data);
            /*
            Il result che viene ritornato è semplicemente un array che si segna i campi correttamente
            compilati nel form (indicati con ok) e quelli che puppeteer si aspetta. Nota però, segna come missing solo
            se ci sono campi extra/sbagliati nella request, ma non riesce ancora a dire se ci sono campi mancanti nella richiesta.
            */
        }

        // captures a screenshot to check if form completed correctly
        await page.screenshot({ path: 'proof.png' });

        //Submits the form
        /*await page.$eval(formSelector, form => form.submit());
        await page.screenshot({ path: 'proof2.png' });*/

        return result;
    }
};


exports.executeIntent = async (page, request) => {
    var fn = Form[request.query.intent];
    if (!fn) return null;

    return await fn(page, request);
};
