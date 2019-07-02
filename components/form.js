function timeout(ms) {
    //Function needed for delaying the screenshot
    return new Promise(resolve => setTimeout(resolve, ms));
};

async function getSelectOptions(page, selector) {
    //Function used to get all the options of a select field to double check the input
    const options = await page.evaluate(optionSelector => {
        return Array.from(document.querySelectorAll(optionSelector))
            .filter(o => o.value)
            .map(o => {
                return {
                    name: o.text,
                    value: o.value
                };
            });
    }, selector);

    return options;
}

var Form = {
    /*
    * fills a form
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
                var formSelector = query.resource.selector.container; //Just used for submit for now

                /*
                To implement the list of compilable fields, an idea could be that of
                searching them using their selector of the form and taking all the
                input fields. I don't know if it's feasible, so I'll try it out
                Further reference: https://docs.google.com/document/d/1zM0DAQF6YNF-htsO7BGP6qvk_qtB4OPD3E_pseb7IiE
                */

                await page.focus(selector);

                switch (type)
                {
                    case 'text':
                        var value = query.resource.attributes[i].value;
                        await page.keyboard.type(value);
                        break;
                    case 'select':
                        /*
                        Ok, working. Basically for the select case, it extracts
                        id, value from the request, then uses a function to get
                        the values available from the select, and if the value
                        in the request is correct, sets that, otherwise leaves
                        the default option, and returns a "missing" as a parameter,
                        this way we're sure that we don't try to set something not
                        available, leaving de facto a blank field in the form, which
                        could fail when submitting.
                        */
                        var id = query.resource.attributes[i].id;
                        var value = query.resource.attributes[i].value;
                        var possibleValues = await getSelectOptions(page, type + '#' + id + ' > option');
                        var ok = false;
                        for (const [ i, entry ] of possibleValues.entries()) {
                            if (value == entry.value)
                            {
                                await page.select(type + "#" + id, value);
                                ok = true;
                            }
                        }
                        if(!ok)
                        {
                            throw "Wrong type!";
                        }
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
            The result returned is simply an array which contains the field which
            have been correctly compiled (ok) and those who encountered whatever
            problem, resulting in their incorrect compilation (missing). NOTE:
            as of now, it sets as missing only the fields which are non-present/wrong
            in the request sent to the engine, but not if in some fields are missing
            in the request.
            */
        }

        // captures a screenshot to check if form completed correctly
        await timeout(1000); //Needed only for screenshot, otherwise puppeteer doesn't have enough time
        await page.screenshot({ path: 'proof.png', fullPage: true });

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
