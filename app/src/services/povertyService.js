'use strict';

const logger = require('logger');
const config = require('config');
const requestPromise = require('request-promise');
const PovertyNotFound = require('errors/povertyNotFound');
const PovertyMalformedResponse = require('errors/povertyMalformedResponse');

String.prototype.replaceAll = function(t, g){
    return this.split(t).join(g);
};

class PovertyService {

    static request(query) {
        logger.info('Doing request to WorldBank');
        logger.info(`${config.get('poverty.serviceUrl')}${query}&format=json`);
        const promise = requestPromise({
            uri: `${config.get('poverty.serviceUrl')}${query}&format=json`,
            method: 'GET',
        });
        return promise;
    }

    static * get(country, filter){
        let povertyLine = filter.povertyLine;
        let years = filter.years;
        logger.debug('YEARS', years);
        if(!years){
            years = '2010,2011,2012,2013,2014,2015';
        }
        let query = `?C0=${country}_3&PL0=${povertyLine}&Y0=${years}`;
        let rawPoverty = yield PovertyService.request(query);
        if(!rawPoverty){
            logger.error('Poverty Not Found');
            throw new PovertyNotFound(`Poverty of country: ${country}, povertyLine: ${povertyLine} and years: ${years} not found`);
        }
        try{
            let poverty = rawPoverty.split('{PovResult:[')[1];
            poverty = '[' + poverty.substring(0, poverty.length-2).trim().replaceAll('\'','\"') + ']';
            return JSON.parse(poverty);
        }
        catch(err){
            logger.error('Error forming response');
            throw new PovertyMalformedResponse(err);
        }
    }

}

module.exports = PovertyService;
