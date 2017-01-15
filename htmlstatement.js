'use strict';

let TxtStatement = require('./txtstatement');
let tag = require('./tag');

class HtmlStatement extends TxtStatement {

    getFooter() {
        let totalAmount = this._customer.totalRentalAmount,
            totalFrequentRenterPoints = this._customer.totalFrequentRenterPoints;
        let result = `Amount owed is ${totalAmount}\n`;
        result += `You earned ${totalFrequentRenterPoints} frequent renter points\n`;
        return tag('p', result);
    }

    getHeader() {
        let result = `Rental Record for ${this._customer.name}\n`;
        return tag('h1', result);
    }

    getRentalsPresentation() {
        let result = '';
        for (let rental of this._customer.rentals) {
            let movie = rental.movie,
                currentRentalAmount = rental.amount,
                moviePresentation = `\t${movie.title}\t${currentRentalAmount}\n`;
            result += tag('li', moviePresentation)
        }
        return tag('ul', result);
    }
}

module.exports = HtmlStatement;