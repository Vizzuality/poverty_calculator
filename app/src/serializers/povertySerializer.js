'use strict';

var logger = require('logger');
var JSONAPISerializer = require('jsonapi-serializer').Serializer;
var povertySerializer = new JSONAPISerializer('poverty', {
    attributes: ['poverty'],
    pluralizeType: false,
    keyForAttribute: 'camelCase'
});

class PovertySerializer {

    static serialize(data) {

        let result = {
            data: {}
        };
        if(data){
            result.data = {
                id: 'undefined',
                type: 'poverty',
                attributes:{
                    mean: data.mean,
                    povertyGap: data.povertyGap
                }
            };
        }
        return result;
    }
}

module.exports = PovertySerializer;
