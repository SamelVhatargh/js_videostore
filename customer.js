'use strict';

let Rental = require('./rental');

class Customer {
    constructor(data, movies) {
        this._data = data;
        this._movies = movies;
    }

    get name() {
        return this._data.name;
    }

    get rentals() {
        return this._data.rentals.map(rental => new Rental(rental, this._movies));
    }

    get totalRentalAmount() {
        let totalAmount = 0;
        for (let rental of this.rentals) {
            totalAmount += rental.amount;
        }
        return totalAmount;
    }
}

module.exports = Customer;
