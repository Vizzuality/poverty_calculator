'use strict';

class PovertyNotFound extends Error{

    constructor(message){
        super(message);
        this.name = 'PovertyNotFound';
        this.message = message;
    }

}
module.exports = PovertyNotFound;
