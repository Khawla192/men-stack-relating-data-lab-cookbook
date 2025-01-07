const express = require('express');
const router = express.Router();

const User = require('../models/user.js');

router.get('/', async (req, res) => {
    try {
        const currentUser = await User.findById(req.session.user._id);
        res.render('users/index.ejs', {
            names: currentUser.name,
        });
    } catch (error) {
        console.log(error);
        res.redirect('/');
    }
});

router.get('/:userId', async (req, res) => {
    try {
        const currentUser = await User.findById(req.session.user._id);
        const food = currentUser.foods.id(req.params.foodId);
        res.render('users/show.ejs', {
            food: food,
        });
    } catch (error) {
        console.log(error);
        res.redirect('/');
    }
});

module.exports = router;
