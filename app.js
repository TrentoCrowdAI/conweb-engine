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

//LIST RESOURCES EXAMPLE
    /*var request = {
        url: "file:///home/matteo/Uni/Tirocinio/conweb-engine/testPage.html",
        component: "list",
        query: {
            intent : "list_resources",
            resource : {
                name : "movies",
                selector: { container: "ul#mv", item: ["li"] },
                type: "movies",
                attributes : [{
                    name : "title",
                    selector : "h1"
                },{
                    name : "stars",
                    selector : "[bot-attribute=stars]"
                },{
                    name : "director",
                    selector : "[bot-attribute=director]"
                },{
                    name : "plot",
                    selector : "[bot-attribute=plot]"
                },{
                    name : "length",
                    selector : "[bot-attribute=length]"
                }]
            },}
        };//*/

    /*var request = {
        url: "file:///home/matteo/Uni/Tirocinio/conweb-engine/testPage2.html",
        component: "list",
        query: {
            intent : "list_resources",
            resource : {
                name : "sports",
                selector: { container: "ul#sn", item: ["li"] },
                type: "sport news",
                attributes : [{
                    name : "Category",
                    selector : "h1"
                },{
                    name : "News #1",
                    selector : "[bot-attribute=n1]"
                },{
                    name : "News #2",
                    selector : "[bot-attribute=n2]"
                },{
                    name : "News #3",
                    selector : "[bot-attribute=n3]"
                }]
            },}
        };*/

        /*var request = {
            url: "file:///home/matteo/Uni/Tirocinio/conweb-engine/testPage2.html",
            component: "list",
            query: {
                intent : "list_resources",
                resource : {
                    name : "sports",
                    selector: { container: "div#sa", item: ["article", "div.o-herobox-card"]},
                    type: "serie A",
                    attributes : [{
                        name : "Name",
                        selector : "h1"
                    },{
                        name : "Allenatore",
                        selector : "[bot-attribute=allenatore]"
                    },{
                        name : "Capitano",
                        selector : "[bot-attribute=capitano]"
                    },{
                        name : "Valutazione squadra",
                        selector : "[bot-attribute=valutazione]"
                    }]
                },}
            };*/

//LIST COUNT EXAMPLE
/*var request = {
    url: "file:///home/matteo/Uni/Tirocinio/conweb-engine/testPage.html",
    component: "list",
    query: {
        intent : "list_count",
        resource : {
            name : "movies",
            selector: { container: "ul#mv", item: ["li"] },
            type: "movies",
            attributes : [{
                name : "title",
                selector : "h1"
            },{
                name : "stars",
                selector : "[bot-attribute=stars]"
            },{
                name : "director",
                selector : "[bot-attribute=director]"
            },{
                name : "plot",
                selector : "[bot-attribute=plot]"
            },{
                name : "length",
                selector : "[bot-attribute=length]"
            }]
        },}
    };*/

    /*var request = {
        url: "file:///home/matteo/Uni/Tirocinio/conweb-engine/testPage2.html",
        component: "list",
        query: {
            intent : "list_count",
            resource : {
                name : "sports",
                selector: { container: "div#sa", item: ["article", "div.o-herobox-card"]},
                type: "serie A",
                attributes : [{
                    name : "Name",
                    selector : "h1"
                },{
                    name : "Allenatore",
                    selector : "[bot-attribute=allenatore]"
                },{
                    name : "Capitano",
                    selector : "[bot-attribute=capitano]"
                },{
                    name : "Valutazione squadra",
                    selector : "[bot-attribute=valutazione]"
                }]
            },}
        };*/

//LIST SORT EXAMPLE
/*var request = {
    url: "file:///home/matteo/Uni/Tirocinio/conweb-engine/testPage.html",
    component: "list",
    query: {
        intent : "list_sort",
        parameters : [{
            name : "attribute",
            value : "stars"
        },{
            name : "sort_op",
            value : "descending"
        }],
        resource : {
            name : "movies",
            selector: { container: "ul#mv", item: ["li"] },
            type: "movies",
            attributes : [{
                name : "title",
                selector : "h1"
            },{
                name : "stars",
                selector : "[bot-attribute=stars]"
            },{
                name : "director",
                selector : "[bot-attribute=director]"
            },{
                name : "plot",
                selector : "[bot-attribute=plot]"
            },{
                name : "length",
                selector : "[bot-attribute=length]"
            }]
        },}
    };//*/

        /*var request = {
            url: "file:///home/matteo/Uni/Tirocinio/conweb-engine/testPage2.html",
            component: "list",
            query: {
                intent : "list_sort",
                parameters : [{
                    name : "attribute",
                    value : "valutazione"
                },{
                    name : "sort_op",
                    value : "ascending"
                }],
                resource : {
                    name : "sports",
                    selector: { container: "div#sa", item: ["article", "div.o-herobox-card"]},
                    type: "serie A",
                    attributes : [{
                        name : "Name",
                        selector : "h1"
                    },{
                        name : "Allenatore",
                        selector : "[bot-attribute=allenatore]"
                    },{
                        name : "Capitano",
                        selector : "[bot-attribute=capitano]"
                    },{
                        name : "Valutazione squadra",
                        selector : "[bot-attribute=valutazione]"
                    }]
                },}
            };//*/

//LIST FILTER EXAMPLE
/*var request = {
    url: "file:///home/matteo/Uni/Tirocinio/conweb-engine/testPage.html",
    component: "list",
    query: {
        intent: "list_filter",
        parameters: [{
            name: "attr-value",
            value: "4.5"
        },{
            name: "filter_op",
            value: "greater"
        }, {
            name: "attribute",
            value: "stars"
        }],
        resource: {
            name: "movies",
            selector: { container: "ul#mv", item: ["li"] },
            type: "movies",
            attributes : [{
                name : "title",
                selector : "h1"
            },{
                name : "stars",
                selector : "[bot-attribute=stars]"
            },{
                name : "director",
                selector : "[bot-attribute=director]"
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

/*var request = {
    url: "file:///home/matteo/Uni/Tirocinio/conweb-engine/testPage2.html",
    component: "list",
    query: {
        intent : "list_filter",
        parameters: [{
            name: "attr-value",
            value: "Massimiliano Allegri"
        },{
            name: "filter_op",
            value: "equals"
        }, {
            name: "attribute",
            value: "Allenatore"
        }],
        resource : {
            name : "sports",
            selector: { container: "div#sa", item: ["article", "div.o-herobox-card"]},
            type: "serie A",
            attributes : [{
                name : "Name",
                selector : "h1"
            },{
                name : "Allenatore",
                selector : "[bot-attribute=allenatore]"
            },{
                name : "Capitano",
                selector : "[bot-attribute=capitano]"
            },{
                name : "Valutazione squadra",
                selector : "[bot-attribute=valutazione]"
            }]
        },}
    };//*/

    /*var request = {
        url: "file:///home/matteo/Uni/Tirocinio/conweb-engine/testPage2.html",
        component: "list",
        query: {
            intent : "list_filter",
            parameters: [{
                name: "attr-value",
                value: "4.5"
            },{
                name: "filter_op",
                value: "less"
            }, {
                name: "attribute",
                value: "Valutazione squadra"
            }],
            resource : {
                name : "sports",
                selector: { container: "div#sa", item: ["article", "div.o-herobox-card"]},
                type: "serie A",
                attributes : [{
                    name : "Name",
                    selector : "h1"
                },{
                    name : "Allenatore",
                    selector : "[bot-attribute=allenatore]"
                },{
                    name : "Capitano",
                    selector : "[bot-attribute=capitano]"
                },{
                    name : "Valutazione squadra",
                    selector : "[bot-attribute=valutazione]"
                }]
            },}
        };//*/

//LIST ABOUT EXAMPLE
/*var request = {
    url: "file:///home/matteo/Uni/Tirocinio/conweb-engine/testPage.html",
    component: "list",
    query: {
        intent : "list_about",
        resource : {
            name : "movies",
            selector: { container: "ul#mv", item: ["li"] },
            type: "movies",
            attributes : [{
                name : "title",
                selector : "h1"
            },{
                name : "stars",
                selector : "[bot-attribute=stars]"
            },{
                name : "director",
                selector : "[bot-attribute=director]"
            },{
                name : "plot",
                selector : "[bot-attribute=plot]"
            },{
                name : "length",
                selector : "[bot-attribute=length]"
            }]
        },}
    };*/

        /*var request = {
            url: "file:///home/matteo/Uni/Tirocinio/conweb-engine/testPage2.html",
            component: "list",
            query: {
                intent : "list_about",
                resource : {
                    name : "sports",
                    selector: { container: "div#sa", item: ["article", "div.o-herobox-card"]},
                    type: "serie A",
                    attributes : [{
                        name : "Name",
                        selector : "h1"
                    },{
                        name : "Allenatore",
                        selector : "[bot-attribute=allenatore]"
                    },{
                        name : "Capitano",
                        selector : "[bot-attribute=capitano]"
                    },{
                        name : "Valutazione squadra",
                        selector : "[bot-attribute=valutazione]"
                    }]
                },}
            };*/

//LIST SUMMARY ONLY EXAMPLE
/*var request = {
    url: "file:///home/matteo/Uni/Tirocinio/conweb-engine/testPage.html",
    component: "list",
    query: {
        intent : "list_summary",
        parameters: [{
            name: "summary_op",
            value: "only"
        }, {
            name: "attribute",
            value: ["title", "stars"]
        }],
        resource : {
            name : "movies",
            selector: { container: "ul#mv", item: ["li"] },
            type: "movies",
            attributes : [{
                name : "title",
                selector : "h1"
            },{
                name : "stars",
                selector : "[bot-attribute=stars]"
            },{
                name : "director",
                selector : "[bot-attribute=director]"
            },{
                name : "plot",
                selector : "[bot-attribute=plot]"
            },{
                name : "length",
                selector : "[bot-attribute=length]"
            }]
        },}
    };//*/

        /*var request = {
            url: "file:///home/matteo/Uni/Tirocinio/conweb-engine/testPage2.html",
            component: "list",
            query: {
                intent : "list_summary",
                parameters: [{
                    name: "summary_op",
                    value: "only"
                }, {
                    name: "attribute",
                    value: ["Allenatore", "Capitano"]
                }],
                resource : {
                    name : "sports",
                    selector: { container: "div#sa", item: ["article", "div.o-herobox-card"]},
                    type: "serie A",
                    attributes : [{
                        name : "Name",
                        selector : "h1"
                    },{
                        name : "Allenatore",
                        selector : "[bot-attribute=allenatore]"
                    },{
                        name : "Capitano",
                        selector : "[bot-attribute=capitano]"
                    },{
                        name : "Valutazione squadra",
                        selector : "[bot-attribute=valutazione]"
                    }]
                },}
            };//*/

//LIST SUMMARY REMOVE EXAMPLE
/*var request = {
    url: "file:///home/matteo/Uni/Tirocinio/conweb-engine/testPage.html",
    component: "list",
    query: {
        intent : "list_summary",
        parameters: [{
            name: "summary_op",
            value: "remove"
        }, {
            name: "attribute",
            value: ["plot", "stars"]
        }],
        resource : {
            name : "movies",
            selector: { container: "ul#mv", item: ["li"] },
            type: "movies",
            attributes : [{
                name : "title",
                selector : "h1"
            },{
                name : "stars",
                selector : "[bot-attribute=stars]"
            },{
                name : "director",
                selector : "[bot-attribute=director]"
            },{
                name : "plot",
                selector : "[bot-attribute=plot]"
            },{
                name : "length",
                selector : "[bot-attribute=length]"
            }]
        },}
    };//*/

    /*var request = {
        url: "file:///home/matteo/Uni/Tirocinio/conweb-engine/testPage2.html",
        component: "list",
        query: {
            intent : "list_summary",
            parameters: [{
                name: "summary_op",
                value: "remove"
            }, {
                name: "attribute",
                value: ["Valutazione squadra", "Capitano"]
            }],
            resource : {
                name : "sports",
                selector: { container: "div#sa", item: ["article", "div.o-herobox-card"]},
                type: "serie A",
                attributes : [{
                    name : "Name",
                    selector : "h1"
                },{
                    name : "Allenatore",
                    selector : "[bot-attribute=allenatore]"
                },{
                    name : "Capitano",
                    selector : "[bot-attribute=capitano]"
                },{
                    name : "Valutazione squadra",
                    selector : "[bot-attribute=valutazione]"
                }]
            },}
        };//*/

        //FILL FORM EXAMPLE
        /*
        Vista così, i vari campi del resource non sembrano servire, o meglio servono per distinguere form "costruiti uguali"
        ma con funzioni diverse o che appartengono a sezioni diverse. Non ho bene idea di come procedere tuttavia, nel senso che credo
        sia improbabile che si verifichi la suddetta condizione, da esporre il problema e confrontarsi.
        */
            /*var request = {
                url: "file:///home/matteo/Uni/Tirocinio/conweb-engine/testPage3.html",
                component: "form",
                query: {
                    intent : "fill_form",
                    resource : {
                        name : "datiUtente",
                        selector: { container: "form#du", item: ["input", "select"] },
                        type: "datiUtente",
                        attributes : [{
                            name : "firstname",
                            type : "text",
                            selector : "[bot-attribute=firstname]",
                            value: "Aronne"
                        },{
                            name : "lastname",
                            type : "text",
                            selector : "[bot-attribute=lastname]",
                            value: "MePare"
                        },{
                            name : "password",
                            type : "text",
                            id: "psw",
                            selector : "[bot-attribute=psw]",
                            value: "RandomPassword"
                        },{
                            name : "telephone",
                            type : "tel",
                            selector : "[bot-attribute=phone]",
                            value: "123-456-7890"
                        },{
                            name : "email",
                            type : "email",
                            id: "email",
                            selector : "[bot-attribute=ema]",
                            value: "aronne.mepare@gmail.com"
                        },{
                            name : "birthday",
                            type : "date",
                            id: "bday",
                            selector : "[bot-attribute=bday]",
                            value: "12/13/2000"
                        },{
                            name : "gender",
                            type : "select",
                            id: "gender",
                            selector : "[bot-attribute=gender]",
                            value: "Male"
                        },{
                            name : "occupation1",
                            type : "checkbox",
                            selector : "[bot-attribute=occupation1]"
                        },{
                            name : "remember",
                            type : "radio",
                            selector : "[bot-attribute=remember]"
                        }]
                    }
                }
            };//*/

            /*var request = {
                "url": "https://www.google.com/search?source=hp&ei=Dn5xXbL6FovJkwWP6Zy4Dg&q=us",
                "component": "form",
                "query": {
                    "intent": "fill_form",
                    "resource": {
                        "type": "search",
                        "selector": {
                            "container": "form#tsf"
                        },
                        "attributes": [
                            {
                                "name": "search word",
                                "selector": "input.gLFyf.gsfi",
                                "type": "text",
                                "value": "canada"
                            }
                        ],
                        "name": "search"
                    }
                }
            };//*/

            /*var request = {
                url: "https://www.google.com/search?source=hp&ei=xX9xXeD_DIHykwXqqaTQAw&q=cnn",
                component: "form",
                query: {
                    intent : "fill_form",
                    resource : {
                        name : "search",
                        selector: { container: "form#tsf"},
                        type: "search", //per esempi reali non ho idea di cosa mettere nei campi fino a qui
                        attributes : [{
                            name : "search word",
                            type : "text",
                            selector : "input.gLFyf",
                            value: "trump"
                        }]
                    }
                }
            };//*/

            /*
            Da sistemare, per i click sui vari radio button ecc basta dirgli qual cliccare,
            senza campi value che fanno casino e basta
            Ora come ora il discorso dei radio button vengono cliccati solamente se presenti
            nella request, che comunque deve essere rivista perchè scritta da bestie
            Per ora uso solo i bot-attribure come selector, ma volendo si possono anche usare gli
            id dei vari campi di input per selezionarli
            */

            //NOTE: this is an example from a real world case
            /*var request = {
                url: "https://myaccount.rid.org/Public/Search/Member.aspx",
                component: "form",
                query: {
                    intent : "fill_form",
                    resource : {
                        name : "",
                        selector: { container: "", item: [] },
                        type: "", //per esempi reali non ho idea di cosa mettere nei campi fino a qui
                        attributes : [{
                            name : "ctl00$FormContentPlaceHolder$Panel$firstNameTextBox",
                            type : "text",
                            selector : "[id=FormContentPlaceHolder_Panel_firstNameTextBox]",
                            value: "Giancarlo"
                        },{
                            name : "ctl00$FormContentPlaceHolder$Panel$lastNameTextBox",
                            type : "text",
                            selector : "[id=FormContentPlaceHolder_Panel_lastNameTextBox]",
                            value: "Stanton"
                        },{
                            name : "ctl00$FormContentPlaceHolder$Panel$categoryDropDownList",
                            type : "select",
                            id: "FormContentPlaceHolder_Panel_categoryDropDownList",
                            selector : "[id=FormContentPlaceHolder_Panel_categoryDropDownList]",
                            value: "a027b6c0-07bb-4301-b9b5-1b38dcdc59b6"
                        },{
                            name : "ctl00$FormContentPlaceHolder$Panel$certificatesCheckBoxList$0",
                            type : "checkbox",
                            selector : "[id=FormContentPlaceHolder_Panel_certificatesCheckBoxList_0]"
                        },{
                            name : "ctl00$FormContentPlaceHolder$Panel$certificatesCheckBoxList$16",
                            type : "checkbox",
                            selector : "[id=FormContentPlaceHolder_Panel_certificatesCheckBoxList_16]"
                        },{
                            name: "team",
                            type: "text",
                            selector: "[bot-attribute=team]",
                            value: "New York Yankees"
                        }]
                    }
                }
            };//*/

            //READ ARTICLE EXAMPLE
                /*var request = {
                    url: "file:///home/matteo/Uni/Tirocinio/conweb-engine/testPage4.html",
                    component: "article",
                    query: {
                        intent : "article_read",
                        resource : {
                            selector: "[bot-attribute=articleTitle]",
                            attributes : [
                            "[bot-attribute=articleBody]"
                            ]}
                        }
                    };//*/

                /*var request = {
                    "url": "https://edition.cnn.com/2019/09/03/uk/brexit-parliament-returns-no-deal-gbr-intl/index.html",
                    "component": "article",
                    "query": {
                        "intent": "article_read",
                        "resource": {
                            "selector": "h1",
                            "attributes": [
                                "div.Article__primary",
                                "div[itemprop=articleBody]",
                                "div.BasicArticle__main"]
                            }
                         }
                     };//*/

                /*var request = {
                    url: "file:///home/matteo/Uni/Tirocinio/conweb-engine/testPage4.html",
                    component: "article",
                    query: {
                        intent : "article_sum",
                        resource : {
                            selector: "[bot-attribute=articleTitle]",
                            attributes : [
                                "article#frcst"
                        ]}
                    }
                };//*/

                 /*var request = {
                     "url": "https://edition.cnn.com/2019/09/03/uk/brexit-parliament-returns-no-deal-gbr-intl/index.html",
                     "component": "article",
                     "query": {
                         "intent": "article_sum",
                         "resource": {
                             "selector": "h1",
                             "attributes": [
                                 "div.Article__primary",
                                 "div[itemprop=articleBody]",
                                 "div.BasicArticle__main"]
                             }
                          }
                      };//*/


try {
    engine.processIntent(request).then(res => console.log(res));
} catch (err) {

    console.log("Error========");
    console.log(err);
}
