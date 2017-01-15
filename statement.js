'use strict';

let tag = require('./tag');

class Statement {
    constructor(customer) {
        this._customer = customer;
    }

    render(format) {
        if (format === 'txt') {
            return this.getHeader(format)
                + this.getRentalsPresentation(format)
                + this.getFooter();
        } else {
            return this.getHeader(format)
                + this.getRentalsPresentation(format)
                + this.getHtmlFooter();
        }
    }

    getFooter() {
        let totalAmount = this._customer.totalRentalAmount,
            totalFrequentRenterPoints = this._customer.totalFrequentRenterPoints;
        let result = `Amount owed is ${totalAmount}\n`;
        result += `You earned ${totalFrequentRenterPoints} frequent renter points\n`;

        return result;
    }

    getHtmlFooter() {
        let totalAmount = this._customer.totalRentalAmount,
            totalFrequentRenterPoints = this._customer.totalFrequentRenterPoints;
        let result = `Amount owed is ${totalAmount}\n`;
        result += `You earned ${totalFrequentRenterPoints} frequent renter points\n`;
        return tag('p', result);
    }

    getHeader(format) {
        let result = `Rental Record for ${this._customer.name}\n`;
        return format === 'html' ? tag('h1', result) : result;
    }

    getRentalsPresentation(format) {
        let result = '';
        for (let rental of this._customer.rentals) {
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
}

module.exports = Statement;
