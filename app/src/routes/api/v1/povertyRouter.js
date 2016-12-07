'use strict';

var Router = require('koa-router');
var logger = require('logger');
var config = require('config');
var PovertyService = require('services/povertyService');
var PovertySerializer = require('serializers/povertySerializer');
var PovertyQueryValidator = require('validators/povertyQueryValidator');
const PovertyQueryNotValid = require('errors/povertyQueryNotValid');
const PovertyNotFound = require('errors/povertyNotFound');
const PovertyMalformedResponse = require('errors/povertyMalformedResponse');

var router = new Router();

class PovertyRouter {

    static * get(){
        let country = this.params.country;
        let filter = {
            povertyLine: this.query.povertyLine,
            years: this.query.years
        };
        logger.info(`Getting poverty of ${country} with poverty line: ${filter.povertyLine}`);
        try{
            let result = yield PovertyService.get(country, filter);
            this.body = PovertySerializer.serialize(result);
        }
        catch(err) {
            if (err instanceof PovertyMalformedResponse){
                this.throw(400, err.message);
                return;
            }
            else if (err instanceof PovertyNotFound){
                this.throw(404, err.message);
                return;
            }
            else{
                this.throw(500, err);
                return;
            }
        }
    }

}

// Validator Wrapper
const validationMiddleware = function*(next){
    if(!this.request.query){
        this.throw(400, 'Bad request');
        return;
    }
    try{
        yield PovertyQueryValidator.validate(this);
    } catch(err) {
        if(err instanceof PovertyQueryNotValid){
            this.throw(400, err.message);
            return;
        }
        throw err;
    }
    yield next;
};

// poverty
router.get('/poverty/:country', validationMiddleware, PovertyRouter.get);


module.exports = router;
