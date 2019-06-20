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


try {
    engine.processIntent(request).then(res => console.log(res));
} catch (err) {

    console.log("Error========");
    console.log(err);
}
