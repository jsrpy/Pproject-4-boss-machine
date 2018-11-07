const express = require('express');
const db = require('./db.js');
const minionsRouter = express.Router();

minionsRouter.param('minionId', (req, res ,next, id) => {
    const minion = db.getFromDatabaseById('minions', id);
    if (minion) {
        req.minion = minion;
        next();
    } else {
        res.status(404).send();
    }
});

minionsRouter.get('/', (req, res ,next) => {
    res.send(db.getAllFromDatabase('minions'));
});

minionsRouter.get('/:minionId', (req, res ,next) => {
    res.send(req.minion);
});

minionsRouter.put('/:minionId', (req, res ,next) => {
    const updated = db.updateInstanceInDatabase('minions', req.body);
    if (!updated) {
        return res.status(404).send();
    }
    res.send(updated);
});

minionsRouter.post('/', (req, res ,next) => {
    const newMinion = db.addToDatabase('minions', req.body);
    if (!newMinion) {
        return res.status(404).send();
    }
    res.status(201).send(newMinion);
});

minionsRouter.delete('/:minionId', (req, res ,next) => {
    const bool = db.deleteFromDatabasebyId('minions', req.minion.id);
    if (!bool) {
        return res.status(404).send();
    }
    res.status(204).send();
});

// minion-works
minionsRouter.get('/:minionId/work',  (req, res ,next) => {
    const allwork = db.getAllFromDatabase('work');
    const works = allwork.filter(work => work.minionId === req.params.minionId);
    if (!works || works.length === 0) {
        return res.status(404).send();
    }
    res.send(works);
});

minionsRouter.put('/:minionId/work/:workId',  (req, res ,next) => {
    const minionId = req.params.minionId;
    const workId = req.params.workId;
    const work = db.getFromDatabaseById('work', workId);

    if (minionId !== req.body.minionId) {
        return res.status(400).send();
    }
    if (!work || work.length === 0) {
        return res.status(404).send();
    }
    const updatedWork = db.updateInstanceInDatabase('work', req.body);
    res.send(updatedWork);
});

minionsRouter.post('/:minionId/work',  (req, res ,next) => {
    const newWork = db.addToDatabase('work', req.body);
    res.status(201).send(newWork);
});

minionsRouter.delete('/:minionId/work/:workId',  (req, res ,next) => {
    const workId = req.params.workId;
    const bool = db.deleteFromDatabasebyId('work', workId);
    if (bool) {
        res.status(204).send();
    } else {
        res.status(404).send();
    }
});

module.exports = minionsRouter;