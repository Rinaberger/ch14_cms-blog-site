const path = require('path');
const router = require('express').Router();
const sequelize = require('../config/connection');
const { User, Blog } = require('../models');
const withAuth = require('../utils/auth');

// Connect with sign up page
router.get('/signup', (req, res) => {
  //If user is already logged in, redirect to userlist
  if (req.session.loggedIn) {
    res.redirect('/userlist');
    return;
  }
  res.render('signup');
});

// Connect with login page
router.get('/login', (req, res) => {
  //If user is already logged in, redirect to userlist
  if (req.session.loggedIn) {
    res.redirect('/userlist');
    return;
  }
  res.render('login');
});

//Connect to user List
router.get('/userlist', withAuth, (req, res) => {
  Blog.findAll({
    where: { 
      user_id: req.session.user_id 
    },
    include: [
      {
        model: User,
        attributes: ['username']
      }
    ]
  }).then((dbBlogData) => {
    const blogs = dbBlogData.map((blog) => blog.get({ plain: true }));
    const user = req.session.username
    console.log(blogs);
    res.render('userlist', {
      user,
      blogs,
      loggedIn: req.session.loggedIn,
    });
  }).catch(err => {
    console.log(err);
    res.status(500).json(err);
  });
});

  
//display all user blogs in dashboard
router.get('/dashboard', withAuth, (req, res) => {
  console.log(req.session);
  console.log('======================');
  Blog.findAll({
    attributes: [
      'title',
      'body',      
    ],
    include: [
      {
        model: User,
        attributes: ['username']
      }
    ]
  })
    .then(dbBlogData => {
      const blogs = dbBlogData.map(blog => blog.get({ plain: true }));
      res.render('dashboard', { blogs, loggedIn: true });
    })
    .catch(err => {
      console.log(err);
      res.status(500).json(err);
    });
});

  
//redirect undefined to login page
router.get("*", (req, res) => {
  res.render('login');
  //if user is already logged in, they will be redirected to their dashboard
});

//Export router function
module.exports = router;