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
        };*/

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
                            value: "Matteo"
                        },{
                            name : "lastname",
                            type : "text",
                            selector : "[bot-attribute=lastname]",
                            value: "Strada"
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

            /*Da sistemare, per i click sui vari radio button ecc basta dirgli qual cliccare,
            senza campi value che fanno casino e basta
            Ora come ora il discorso dei radio button vengono cliccati solamente se presenti
            nella request, che comunque deve essere rivista perchè scritta da bestie*/
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
                            value: "Angela"
                        },{
                            name : "lastname",
                            type : "text",
                            selector : "[bot-attribute=lastname]",
                            value: "Rossi"
                        },{
                            name : "gender",
                            type : "select",
                            id: "gender",
                            selector : "[bot-attribute=gender]",
                            value: "Female"
                        },{
                            name : "occupation2",
                            type : "checkbox",
                            selector : "[bot-attribute=occupation2]"
                        }]
                    }
                }
            };//*/

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
                            value: "Giancarlo"
                        },{
                            name : "lastname",
                            type : "text",
                            selector : "[bot-attribute=lastname]",
                            value: "Stanton"
                        },{
                            name : "gender",
                            type : "select",
                            id: "gender",
                            selector : "[bot-attribute=gender]",
                            value: "Male"
                        },{
                            name : "occupation2",
                            type : "checkbox",
                            selector : "[bot-attribute=occupation2]"
                        },{
                            name: "workfield",
                            type: "text",
                            selector: "[bot-attribute=workfield]",
                            value: "Baseball Player"
                        },{
                            name: "team",
                            type: "text",
                            selector: "[bot-attribute=team]",
                            value: "New York Yankees"
                        }]
                    }
                }
            };//*/


try {
    engine.processIntent(request).then(res => console.log(res));
} catch (err) {

    console.log("Error========");
    console.log(err);
}
