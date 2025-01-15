const express = require('express');
const router = express.Router();

const User = require('../models/user.js');

router.get('/', async (req, res) => {
    try {
        const currentUser = await User.findById(req.session.user._id);
        const pantryItems = currentUser.pantry || [];
        res.render('foods/index.ejs', {
            user: currentUser, 
            pantryItems, 
        });
    } catch (error) {
        console.log(error);
        res.redirect('/');
    }
});

router.get('/new', async (req, res) => {
    res.render('foods/new.ejs');
});

router.post('/', async (req, res) => {
    try {
        const currentUser = await User.findById(req.session.user._id);
        currentUser.pantry.push(req.body);
        await currentUser.save();
        res.redirect(`/users/${currentUser._id}/foods`);
    } catch (error) {
        console.log(error);
        return res.status(500).send('Error adding item. Please try again.'); 
        // res.redirect('/');
    }
});

router.get('/:foodId', async (req, res) => {
    try {
        const currentUser = await User.findById(req.session.user._id);
        const foodItem = currentUser.pantry.id(req.params.foodId);
        res.render('foods/show.ejs', { foodItem });
    } catch (error) {
        console.log(error);
        res.redirect('/');
    }
});

router.delete('/:foodID', async (req, res) => {
    try {
        const currentUser = await User.findById(req.session.user._id);
        currentUser.pantry.id(req.params.foodId).deleteOne(); 
        await currentUser.save();
        res.redirect(`/users/${currentUser._id}/foods`);
    } catch (error) {
        console.log(error);
        return res.status(500).send('Error deleting item. Please try again.'); 
        // res.redirect('/');
    }
});

router.get('/:foodId/edit', async (req, res) => {
    try {
        const currentUser = await User.findById(req.session.user._id);
        const food = currentUser.pantry.id(req.params.foodId);
        res.render('foods/edit.ejs', { food });
    } catch (error) {
        console.log(error);
        res.redirect('/');
    }
});

router.put('/:foodId', async (req, res) => {
    try {
        const currentUser = await User.findById(req.session.user._id);
        const food = currentUser.pantry.id(req.params.foodId); 
        food.set(req.body);
        await currentUser.save();
        res.redirect(
            `/users/${currentUser._id}/foods/${req.params.foodId}`
        );
    } catch (error) {
        console.log(error);
        res.redirect('/');
    }
});

module.exports = router;
