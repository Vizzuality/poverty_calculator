'use strict';

class PovertyQueryNotValid extends Error{

    constructor(message){
        super(message);
        this.name = 'PovertyQueryNotValid';
        this.message = message;
    }
    
}
module.exports = PovertyQueryNotValid;
