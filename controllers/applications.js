// controllers/applications.js

const express = require('express');
const router = express.Router();

const User = require('../models/user.js');

// we will build out our router logic here
router.get('/', async (req, res) => {
  try {
    const currentUser = await User.findById(req.session.user._id);
    res.render('applications/index.ejs', {
      applications: currentUser.applications,
    });
  } catch (error) {
    console.log(error);
    res.redirect('/');
  }
});
router.get('/:applicationId', (req, res) => {
  res.send(`here is your request param: ${req.params.applicationId}`);
});

router.get('/new', async (req, res) => {
  res.render('applications/new.ejs');
});


router.post('/', async (req, res) => {
  try {
    // Look up the user from req.session
    const currentUser = await User.findById(req.session.user._id);
    // Push req.body (the new form data object) to the
    // applications array of the current user
    //console.log(req.body);
    currentUser.applications.push(req.body);
    // Save changes to the user
    await currentUser.save();
    // Redirect back to the applications index view
    res.render('applications/index.ejs', {
      applications: currentUser.applications,
    });
  } catch (error) {
    // If any errors, log them and redirect back home
    console.log(error);
    res.redirect('/');
  }
});

module.exports = router;
