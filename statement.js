'use strict';


class Statement {
    constructor(customer) {
        this._customer = customer;
    }

    render() {
        return this.getHeader()
            + this.getRentalsPresentation()
            + this.getFooter();
    }

    getFooter() {
        let totalAmount = this._customer.totalRentalAmount,
            totalFrequentRenterPoints = this._customer.totalFrequentRenterPoints;
        let result = `Amount owed is ${totalAmount}\n`;
        result += `You earned ${totalFrequentRenterPoints} frequent renter points\n`;

        return result;
    }

    getHeader() {
        return `Rental Record for ${this._customer.name}\n`;
    }

    getRentalsPresentation() {
        let result = '';
        for (let rental of this._customer.rentals) {
            let movie = rental.movie,
                currentRentalAmount = rental.amount;
            result += `\t${movie.title}\t${currentRentalAmount}\n`;
        }
        return result;
    }
}

module.exports = Statement;
