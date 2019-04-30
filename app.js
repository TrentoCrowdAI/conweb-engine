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
            selector : "ul",
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

//LIST COUNT EXAMPLE
/*var request = {
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
            name : "sort_type",
            value : "descending"
        }],
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
            selector: "ul",
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

//LIST ABOUT EXAMPLE
/*var request = {
    url: "file:///home/matteo/Uni/Tirocinio/conweb-engine/testPage.html",
    component: "list",
    query: {
        intent : "list_about",
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
            selector : "ul",
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
            selector : "ul",
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


try {
    engine.processIntent(request).then(res => console.log(res));
} catch (err) {

    console.log("Error========");
    console.log(err);
}
