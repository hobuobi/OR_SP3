const config = require('../config');
const request = require('request');

class ActionHandler {
    constructor() {}

    createnewcontract(parameters) {
        return new Promise((resolve, reject) => {
            let url = config.db.url,
                options;

            // need a parameter called 'drug'
            if(typeof parameters['price'] != 'undefined') {
                options = {
                    url: url,
                    headers: {
                        'Content-Type':'application/json'
                    },
                    body: JSON.stringify({
                        'person1': parameters['person1'],
                        'person2': parameters['person2'],
                        'price': parameters['price']
                    })
                };

                request.post(options, (err, res, body) => {
                    if(err) {
                        reject(err);
                    } else {
                        if(res.body) {
                            let body = JSON.parse(res.body),
                                message;

                            message = body.message;

                            resolve(message);
                        } else {
                            reject('Received an empty response from the database.');
                        }
                    }
                })
            } else {
                reject('Could not find parameter "drug" on parameters passed from API.ai');
            }
        });
    }

    orderDrug() {

    }

    usedDrugs() {

    }
}

module.exports = ActionHandler;
