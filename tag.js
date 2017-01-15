'use strict';

function tag(name, string) {
    return `<` + name + `>` + string + `</` + name +  `>`;
}

module.exports = tag;