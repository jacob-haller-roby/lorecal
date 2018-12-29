const express = require('express');
const router = express.Router();
const error = require('./error');
const Campaign = require('../../db/dao/Campaign');
const COLUMNS = require('/db/columns');
const TABLES = require('/db/tables');

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
            [`${TABLES.USERS}.${COLUMNS.DEFAULT.ID}`]: req.params.playerId
        })
        .then(campaigns => res.json(campaigns))
        .catch((err) => error(err, res));
});

router.post('/', (req, res) => {
    Campaign.create(getBody(req))
        .then(campaign => res.json(campaign))
        .catch((err) => error(err, res));
});

router.patch('/:id', (req, res) => {
    Campaign.update(req.params.id, getBody(req))
        .then(campaign => res.json(campaign))
        .catch((err) => error(err, res));
});

router.put('/:id/addPlayer/:playerId', (req, res) => {
    Campaign.addPlayer(req.params.id, req.params.playerId)
        .then(campaign => res.json(campaign))
        .catch((err) => error(err, res));
});

router.put('/:id/removePlayer/:playerId', (req, res) => {
    Campaign.removePlayer(req.params.id, req.params.playerId)
        .then(campaign => res.json(campaign))
        .catch((err) => error(err, res));
});


module.exports = router;