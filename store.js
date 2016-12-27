"use strict";

function statement(customer, movies, format) {
    return getHeader(customer, format)
        + getRentalsPresentation(customer, format)
        + getFooter(customer, format);

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

    function getTotalRentalAmount(customer)
    {
        let totalAmount = 0;
        for (let rental of customer.rentals) {
            totalAmount += getRentalAmount(rental);
        }
        return totalAmount;
    }

    function getFrequentRenterPoints(rental) {
        let movie = getMovie(rental);
        return (movie.code === "new" && rental.days > 2) ? 2 : 1;
    }

    function getTotalFrequentRenterPoints(customer)
    {
        let totalFrequentRenterPoints = 0;
        for (let rental of customer.rentals) {
            totalFrequentRenterPoints += getFrequentRenterPoints(rental);
        }
        return totalFrequentRenterPoints;
    }

    function getRentalsPresentation(customer, format) {
        let result = '';
        for (let rental of customer.rentals) {
            let movie = getMovie(rental),
                currentRentalAmount = getRentalAmount(rental);
            if (format === 'html') {
                result += `<li>${movie.title}\t${currentRentalAmount}</li>\n`;
            } else {
                result += `\t${movie.title}\t${currentRentalAmount}\n`;
            }
        }
        if (format === 'html') {
            result = '<ul>\n' + result + '</ul>\n';
        }
        return result;
    }

    function getHeader(customer, format) {
        let result = `Rental Record for ${customer.name}`;
        if (format === 'html') {
            result = '<h1>' + result + '</h1>';
        }
        return result + `\n`;
    }

    function getFooter(customer, format) {
        let totalAmount = getTotalRentalAmount(customer),
            totalFrequentRenterPoints = getTotalFrequentRenterPoints(customer);

        let result = `Amount owed is ${totalAmount}\n`;
        result += `You earned ${totalFrequentRenterPoints} frequent renter points\n`;
        if (format === 'html') {
            result = '<p>' + result + '</p>';
        }
        return result;
    }

    function tag(name, string) {
        return `<` + name + `>` + string + `</` + name +  `>`;
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

console.log(statement(customer, movies, 'txt'));
console.log(statement(customer, movies, 'html'));