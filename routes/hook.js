const express = require('express');
const router = express.Router();
const ActionHandler = require('../model/ActionHandler');
const actionHandler = new ActionHandler();

// router.use(parseBody(res, req, next));

router.use('/', function(req, res) {
    console.log('Hook route: Request for hook route');
    let body = req.body,
        action;

    if(body) {
        if(body.result) {
            action = body.result.action.replace(".",""),
            parameters = body.result.parameters;

            if(typeof actionHandler[action] != 'undefined') {
                actionHandler[action](parameters).then((speechResponse) => {
                    respondSuccessfully(res, speechResponse);
                }).catch(err => {
                    console.error(err);
                    res.status(500).send("I'm so sorry but I couldn't look that up for you.");
                });
            } else {
                res.status(500).send('Invalid method name. Check API.ai action configuration.');
            }
        } else {
            res.status(400).send('Malformed body on request.');
        }
    } else {
        res.status(400).send('No body on the request.');
    }
});

function respondSuccessfully(res, speechResponse) {
    let webhookResponse = {
        speech: speechResponse,
        displayText: speechResponse,
        data: {},
        contextOut: [],
        source: 'virtual-pharmacist-nodejs-app'
    };

    res.set('Content-Type', 'application/json');
    res.send(webhookResponse);
}


function parseBody(req, res, next) {
    try {
        JSON.parse(req.body);
        next();
    } catch(err) {
        res.status(400).send('You sent and invalid JSON string as the body of the request. Error: %s', err);
    }
}

module.exports = router;
