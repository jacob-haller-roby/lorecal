const express = require('express');
const router = express.Router({mergeParams: true});
const request = require('request');
const error = require('./error');
const Lore = require('../../db/dao/Lore');
const COLUMNS = require('/db/columns');
const TABLES = require('/db/tables');

const getBody = (req) => {
    if (Array.isArray(req.body)) {
        return req.body.map(lore => (
            {
                ...lore,
                [COLUMNS.LORE.AUTHOR_ID]: req.user.id,
                [COLUMNS.LORE.CAMPAIGN_ID]: req.params.campaignId
            }
        ));
    } else {
        return {
            ...req.body,
            [COLUMNS.LORE.AUTHOR_ID]: req.user.id,
            [COLUMNS.LORE.CAMPAIGN_ID]: req.params.campaignId
        }
    }
};

router.get('/', (req, res) => {
    console.log(req.params);
    Lore.find({
            [COLUMNS.LORE.CAMPAIGN_ID]: req.params.campaignId
        })
        .then(lore => res.json(lore))
        .catch((err) => error(err, res));
});

router.post('/', (req, res) => {
    Lore.create(getBody(req))
        .then(lore => res.json(lore))
        .catch((err) => error(err, res));
});

router.patch('/:loreId', (req, res) => {
    Lore.update(req.params.loreId, getBody(req))
        .then(lore => res.json(lore))
        .catch((err) => error(err, res));
});

router.post('/process', (req, res) => {
    console.log('hit process endpoint');
    console.log(req.body.image.substring(0, 100))
    request.post(
        `https://vision.googleapis.com/v1/images:annotate?key=${process.env.VISION_API_KEY}`,
        {
            body: {
                requests: [
                    {
                        image: {
                            content: req.body.image.split(',')[1]
                        },
                        features: [
                            {
                                type: "DOCUMENT_TEXT_DETECTION"
                            }
                        ]
                    }
                ]
            },
            json: true
        },
        (err, httpResponse, body) => {
            console.log(err);

            //console.log(httpResponse.substring(0, 100))
            //
            //[0] [ 'code', 'message', 'status', 'details' ]

            //console.log(body.error.message.substring(0,200));
            //console.log(body.error.details);
            //console.log(httpResponse);
            //console.log(body);
            res.status(200).json(body);
        })
});


module.exports = router;