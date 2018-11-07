const express = require('express');
const db = require('./db.js');
const ideasRouter = express.Router();
const checkMillionDollarIdea = require('./checkMillionDollarIdea');

ideasRouter.param('ideaId', (req, res ,next, id) => {
    const ideaId = id;
    req.ideaId = ideaId;
    next()
});

ideasRouter.get('/', (req, res ,next) => {
    res.send(db.getAllFromDatabase('ideas'));
});

ideasRouter.get('/:ideaId', (req, res ,next) => {
    const idea = db.getFromDatabaseById('ideas', req.ideaId);
    if (!idea) {
        return res.status(404).send();
    }
    res.send(idea);
});

ideasRouter.put('/:ideaId', (req, res ,next) => {
    const updatedIdea = db.updateInstanceInDatabase('ideas', req.body);
    if (!updatedIdea) {
        return res.status(404).send();
    }
    res.send(updatedIdea);
});

ideasRouter.post('/', checkMillionDollarIdea, (req, res ,next) => {
    const newIdea = db.addToDatabase('ideas', req.body);
    if (!newIdea) {
        return res.status(404).send();
    }
    res.status(201).send(newIdea);
});

ideasRouter.delete('/:ideaId', (req, res ,next) => {
    const bool = db.deleteFromDatabasebyId('ideas', req.ideaId);
    if (!bool) {
        return res.status(404).send();
    }
    res.status(204).send();
});

module.exports = ideasRouter;