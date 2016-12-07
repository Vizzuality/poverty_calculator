'use strict';

const logger = require('logger');
const config = require('config');
const PovertyQueryNotValid = require('errors/povertyQueryNotValid');

class PovertyQueryValidator{

    // static isDate(date){
    //     let isDate = false;
    //     if(!isNaN(new Date(date).getTime())){
    //         isDate = true;
    //     }
    //     return isDate;
    // }
    //
    // static isPeriod(period){
    //     let isPeriod = false;
    //     let begin = period.split(',')[0];
    //     let end = period.split(',')[1];
    //     if(!isNaN(Date.parse(begin)) && !isNaN(Date.parse(end))){
    //         if(PovertyQueryValidator.isDate(begin) && PovertyQueryValidator.isDate(end)){
    //             if(new Date(begin) < new Date(end)){
    //                 isPeriod = true;
    //             }
    //         }
    //     }
    //     return isPeriod;
    // }

    static * validate(koaObj){
        logger.info('Validating Poverty Query');
        koaObj.checkQuery('povertyLine').notEmpty().isFloat();
        koaObj.checkQuery('years').optional().check(function(){
            var valid = true;
            let years = this.years.split(',');
            years.forEach(function(el){
                if(parseInt(el) < 1980 || parseInt(el) > new Date().getUTCFullYear()){
                    valid = false;
                    return;
                }
            });
            return valid;
        }.bind(koaObj.request.query));
        // koaObj.checkQuery('period').optional().check(function(){
        //     if(PovertyQueryValidator.isPeriod(this.period)){
        //         return true;
        //     }
        //     return false;
        // }.bind(koaObj.request.query));
        if(koaObj.errors){
            logger.error('Error validating poverty query');
            throw new PovertyQueryNotValid(koaObj.errors);
        }
        return true;
    }

}

module.exports = PovertyQueryValidator;
