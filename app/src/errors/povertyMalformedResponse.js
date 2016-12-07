'use strict';

class PovertyMalformedResponse extends Error{

    constructor(message){
        super(message);
        this.name = 'PovertyMalformedResponse';
        this.message = message;
    }

}
module.exports = PovertyMalformedResponse;
