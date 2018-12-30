const express = require('express');
const router = express.Router({mergeParams: true});
const error = require('./error');
const lore = require('./lore');
const Campaign = require('../../db/dao/Campaign');
const COLUMNS = require('/db/columns');
const TO_MANY = require('/db/toMany');

const getBody = (req) => {
    if (Array.isArray(req.body)) {
        return req.body.map(campaign => (
            {
                ...campaign,
                [COLUMNS.CAMPAIGNS.DM_ID]: req.user.id
            }
        ));
    } else {
        return {
            ...req.body,
            [COLUMNS.CAMPAIGNS.DM_ID]: req.user.id
        }
    }
};

router.get('/', (req, res) => {
    Campaign.find()
        .then(campaigns => res.json(campaigns))
        .catch((err) => error(err, res));
});

router.get('/dm/:dmId', (req, res) => {
    Campaign.find({
            [COLUMNS.CAMPAIGNS.DM_ID]: req.params.dmId
        })
        .then(campaigns => res.json(campaigns))
        .catch((err) => error(err, res));
});

router.get('/player/:playerId', (req, res) => {
    Campaign.find({
            [`${TO_MANY.CAMPAIGNS.PLAYERS}.${COLUMNS.DEFAULT.ID}`]: req.params.playerId
        })
        .then(campaigns => res.json(campaigns))
        .catch((err) => error(err, res));
});

router.post('/', (req, res) => {
    Campaign.create(getBody(req))
        .then(campaign => res.json(campaign))
        .catch((err) => error(err, res));
});

router.patch('/:campaignId', (req, res) => {
    Campaign.update(req.params.campaignId, getBody(req))
        .then(campaign => res.json(campaign))
        .catch((err) => error(err, res));
});

router.put('/:campaignId/addPlayer/:playerId', (req, res) => {
    Campaign.addPlayer(req.params.campaignId, req.params.playerId)
        .then(campaign => res.json(campaign))
        .catch((err) => error(err, res));
});

router.put('/:campaignId/removePlayer/:playerId', (req, res) => {
    Campaign.removePlayer(req.params.campaignId, req.params.playerId)
        .then(campaign => res.json(campaign))
        .catch((err) => error(err, res));
});

router.use('/:campaignId/lore', (req, res, next) => {
    Campaign.findOne({id: req.params.campaignId})
        .then(campaign => {
            if (campaign.dm_id === req.user.id) {
                return next();
            }

            if(campaign.users.some(user => user.id === req.user.id)) {
                return next();
            }

            res.sendStatus(401)
        })
}, lore);

module.exports = router;