const express = require('express');
const db = require('./db.js');
const meetingsRouter = express.Router();

meetingsRouter.get('/',  (req, res ,next) => {
    res.send(db.getAllFromDatabase('meetings'));
});

meetingsRouter.post('/',  (req, res ,next) => {
    const newMeeting = db.addToDatabase('meetings', db.createMeeting());
    res.status(201).send(newMeeting);
});

meetingsRouter.delete('/',  (req, res ,next) => {
    const bool = db.deleteAllFromDatabase('meetings');
    if (!bool) {
        return res.status(404).send();
    }
    res.status(204).send();
});

module.exports = meetingsRouter;