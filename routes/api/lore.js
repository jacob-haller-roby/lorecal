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
            if (err) {
                return error(err, res);
            }
            if (body.error) {
                return error(body.error, res);
            }

            const fullText = body.responses[0].fullTextAnnotation.text;


            const dayRegex = /[dD]ay\s?[#*]\d+/g;
            const daySelectRegex = /\d+/;

            const timeRegex = /\d{1,2}:\d{2}\s?(?:[AaPp][Mm])?/g;

            const timeSelect = /\d{1,2}:\d{2}/;
            const ampmSelect = /[AaPp][Mm]/;

            const textDaySplit = fullText.split(dayRegex);

            let match;
            let timeMatch;

            let dayIndex = 1;

            Promise.resolve()
                .then(() => {
                    while ((match = dayRegex.exec(fullText)) != null) {
                        let day = daySelectRegex.exec(match)[0];

                        let dayText = textDaySplit[dayIndex];
                        dayIndex++;
                        let timeIndex = 1;

                        const textSplitTime = dayText.split(timeRegex);

                        while ((timeMatch = timeRegex.exec(dayText)) != null) {
                            const entry = textSplitTime[timeIndex];
                            timeIndex++;
                            let time = timeSelect.exec(timeMatch[0])[0];
                            let amPm = ampmSelect.exec(timeMatch[0]);

                            if (amPm != null) {
                                let timeArray = time.split(':');
                                let hour = parseInt(timeArray[0]);
                                let minute = parseInt(timeArray[1]);

                                amPm = amPm[0].toUpperCase();

                                if (amPm === 'PM' && hour !== 12) {
                                    hour += 12;
                                } else if (amPm === 'AM' && hour === 12) {
                                    hour = 0;
                                }

                                time = hour + ':' + minute;
                            }

                            console.log('creating lore from image: ', {
                                [COLUMNS.LORE.DAY]: day,
                                [COLUMNS.LORE.TIME]: time,
                                [COLUMNS.LORE.ENTRY]: entry,
                                [COLUMNS.LORE.CAMPAIGN_ID]: req.params.campaignId
                            });

                            Lore.create({
                                [COLUMNS.LORE.DAY]: day,
                                [COLUMNS.LORE.TIME]: time,
                                [COLUMNS.LORE.ENTRY]: entry,
                                [COLUMNS.LORE.CAMPAIGN_ID]: req.params.campaignId,
                                [COLUMNS.LORE.AUTHOR_ID]: req.user.id
                            });

                        }
                    }
                })
                .then(() =>
                    Lore.find({
                            [COLUMNS.LORE.CAMPAIGN_ID]: req.params.campaignId
                        })
                        .then(lore => res.status(200).json(lore))
                )
                .catch((...err) => error(err, res));
        });
});


module.exports = router;