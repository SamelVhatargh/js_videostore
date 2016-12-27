"use strict";

function statement(customer, movies) {
    let totalAmount = 0;
    let totalFrequentRenterPoints = 0;
    let result = `Rental Record for ${customer.name}\n`;
    for (let rental of customer.rentals) {
        let movie = getMovie(rental);
        let currentRentalAmount = getRentalAmount(rental);

        //add frequent renter points
        totalFrequentRenterPoints++;
        // add bonus for a two day new release rental
        if (movie.code === "new" && rental.days > 2) totalFrequentRenterPoints++;

        //print figures for this rental
        result += `\t${movie.title}\t${currentRentalAmount}\n`;
        totalAmount += currentRentalAmount;
    }
    // add footer lines
    result += `Amount owed is ${totalAmount}\n`;
    result += `You earned ${totalFrequentRenterPoints} frequent renter points\n`;

    return result;

    function getMovie(rental) {
        return movies[rental.movieID];
    }

    function getRentalAmount(rental) {
        let movie = getMovie(rental);
        let thisRentalAmount = 0;
        // determine amount for each movie
        switch (movie.code) {
            case "regular":
                thisRentalAmount = 2;
                if (rental.days > 2) {
                    thisRentalAmount += (rental.days - 2) * 1.5;
                }
                break;
            case "new":
                thisRentalAmount = rental.days * 3;
                break;
            case "childrens":
                thisRentalAmount = 1.5;
                if (rental.days > 3) {
                    thisRentalAmount += (rental.days - 3) * 1.5;
                }
                break;
        }
        return thisRentalAmount;
    }
}

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

console.log(statement(customer, movies));