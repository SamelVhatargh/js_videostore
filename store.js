"use strict";

let Customer = require('./customer');
let Statement = require('./statement');
let HtmlStatement = require('./htmlstatement');


let customer = {
    name: "martin",
    rentals: [{
        "movieID": "F001",
        "days": 3
    }, {
        "movieID": "F002",
        "days": 1
    },]
};

let movies = {
    "F001": {
        "title": "Ran",
        "code": "regular"
    },
    "F002": {
        "title": "Trois Couleurs: Bleu",
        "code": "regular"
    },
    // etc
};

let txtStatement = new Statement(new Customer(customer, movies));
let htmlStatement = new HtmlStatement(new Customer(customer, movies));

console.log(txtStatement.render('txt'));
console.log(htmlStatement.render('html'));