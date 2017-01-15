'use strict';

class Rental {
    constructor(data, movies) {
        this._data = data;
        this._movies = movies;
    }

    get movieID() {
        return this._data.movieID;
    }

    get days() {
        return this._data.days;
    }

    get movie() {
        return this._movies[this.movieID];
    }

    get amount() {
        let thisRentalAmount = 0;

        switch (this.movie.code) {
            case "regular":
                thisRentalAmount = 2;
                if (this.days > 2) {
                    thisRentalAmount += (this.days - 2) * 1.5;
                }
                break;
            case "new":
                thisRentalAmount = this.days * 3;
                break;
            case "childrens":
                thisRentalAmount = 1.5;
                if (this.days > 3) {
                    thisRentalAmount += (this.days - 3) * 1.5;
                }
                break;
        }
        return thisRentalAmount;
    }
}

module.exports = Rental;