'use strict';

let tag = require('./tag');

class Statement {
    constructor(customer, format) {
        this._customer = customer;
        this._format = format;
    }

    render() {
        return getHeader(this._customer, this._format)
            + getRentalsPresentation(this._customer, this._format)
            + getFooter(this._customer, this._format);

        function getRentalsPresentation(customer, format) {
            let result = '';
            for (let rental of customer.rentals) {
                let movie = rental.movie,
                    currentRentalAmount = rental.amount,
                    moviePresentation = `\t${movie.title}\t${currentRentalAmount}\n`;

                if (format === 'html') {
                    result += tag('li', moviePresentation)
                } else {
                    result += moviePresentation;
                }
            }

            return format === 'html' ? tag('ul', result) : result;
        }

        function getHeader(customer, format) {
            let result = `Rental Record for ${customer.name}\n`;
            return format === 'html' ? tag('h1', result) : result;
        }

        function getFooter(customer, format) {
            let totalAmount = customer.totalRentalAmount,
                totalFrequentRenterPoints = customer.totalFrequentRenterPoints;
            let result = `Amount owed is ${totalAmount}\n`;
            result += `You earned ${totalFrequentRenterPoints} frequent renter points\n`;

            return format === 'html' ? tag('p', result) : result;
        }
    }
}

module.exports = Statement;
