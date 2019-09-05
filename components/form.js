function timeout(ms) {
    //Function needed for delaying the screenshot
    return new Promise(resolve => setTimeout(resolve, ms));
};

function validateEmail(email) {
    var re = /[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/;
    return re.test(String(email).toLowerCase());
}

function validateDate(date, pattern) {
    if (pattern == null)
    {
        var re = /(?:19|20)(?:(?:[13579][26]|[02468][048])-(?:(?:0[1-9]|1[0-2])-(?:0[1-9]|1[0-9]|2[0-9])|(?:(?!02)(?:0[1-9]|1[0-2])-(?:30))|(?:(?:0[13578]|1[02])-31))|(?:[0-9]{2}-(?:0[1-9]|1[0-2])-(?:0[1-9]|1[0-9]|2[0-8])|(?:(?!02)(?:0[1-9]|1[0-2])-(?:29|30))|(?:(?:0[13578]|1[02])-31)))/;
    }
    else
    {
        var re = new RegExp(pattern);
    }
    return re.test(String(date));
}

function validatePhoneNum(num, pattern) {
    if (pattern == null)
    {
        var re = /(?:19|20)(?:(?:[13579][26]|[02468][048])-(?:(?:0[1-9]|1[0-2])-(?:0[1-9]|1[0-9]|2[0-9])|(?:(?!02)(?:0[1-9]|1[0-2])-(?:30))|(?:(?:0[13578]|1[02])-31))|(?:[0-9]{2}-(?:0[1-9]|1[0-2])-(?:0[1-9]|1[0-9]|2[0-8])|(?:(?!02)(?:0[1-9]|1[0-2])-(?:29|30))|(?:(?:0[13578]|1[02])-31)))/;
    }
    else
    {
        var re = new RegExp(pattern);
    }
    return re.test(String(num));
}

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

async function getPattern(page, selector) {
    //Function used to get the appropriate patterns of the fields
    let item = await page.$(selector);
    let patternHandle = await item.getProperty("pattern");
    let pattern = await patternHandle.jsonValue();
    return pattern;
}

/*
Ad oggi avevo provato ad implementare un metodo che andasse a prendere i pattern specificati
all'interno dei vari input fields, ma non sembra funzionare proprio bene, ho
idea che dipenda dal fatto che i vari pattern non corrispondono perfettamente
alla struttura delle regex, quindi bisognerà lavorare su quello, O, controllare
a mano passando il pattern, un po' laborioso, ma essendo fatto solo sui numeri
potrebbe essere ancora fattibile.
*/

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
                var pattern = await getPattern(page, selector);

                switch (type)
                {
                    case 'text':
                    case 'password': //Bisogna trovare un modo di validare secondo le regole del form
                        const inputValue = await page.$eval(selector, el => el.value);
                        for (let i = 0; i < inputValue.length; i++) {
                            await page.press('Backspace');
                        }
                        await page.focus(selector);
                        var value = query.resource.attributes[i].value;
                        await page.keyboard.type(value);
                        break;
                    case 'tel': //Validato tramite pattern previsto nel campo, o regex generica
                        var value = query.resource.attributes[i].value;

                        if (validatePhoneNum(value, pattern))
                        {
                            await page.keyboard.type(value);
                        }
                        else
                        {
                            throw "Phone number not valid!";
                        }
                        break;
                    case 'email': //Validato con regex
                        var value = query.resource.attributes[i].value;
                        if (validateEmail(value))
                        {
                            await page.keyboard.type(value);
                        }
                        else
                        {
                            throw "Email not valid!";
                        }
                        break;
                    case 'date': //works only if date is passed with JP or US format, otherwise is ambigous
                        var value = query.resource.attributes[i].value;
                        if (await validateDate(value, pattern))
                        {
                            //var date = new Date(value.substring(0, 4), value.substring(5, 7) - 1, value.substring(8, 10), 12, 0, 0);
                            var date = new Date(value);
                            var newDate = date.toLocaleString('en-US', { year: 'numeric', month: '2-digit', day: '2-digit' });
                            //newDate locale is set to en-US because puppeteer default to that if not otherwise specified
                            await page.keyboard.type(newDate);
                        }
                        else
                        {
                            throw "Date not valid!";
                        }
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

        await page.$eval(formSelector, form => form.submit());//*/

        await page.waitForNavigation({timeout: 10000});

        let link = page.url();

        let completeResult = {result: result, link: link};

        return completeResult;
    }
};


exports.executeIntent = async (page, request) => {
    var fn = Form[request.query.intent];
    if (!fn) return null;

    return await fn(page, request);
};
