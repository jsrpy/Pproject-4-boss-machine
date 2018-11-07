const checkMillionDollarIdea = (req, res ,next) => {
    const newIdea = req.body;
    if (Number(newIdea.weeklyRevenue) * Number(newIdea.numWeeks) < 1000000 ||
        !newIdea.weeklyRevenue || !newIdea.numWeeks || 
        !Number(newIdea.numWeeks) || !Number(newIdea.weeklyRevenue)) {
        return res.status(400).send();
    }
    next();
};

// Leave this exports assignment so that the function can be used elsewhere
module.exports = checkMillionDollarIdea;
