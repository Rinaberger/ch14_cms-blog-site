const router = require('express').Router();
const { Blog, User, } = require('../../models');
const withAuth = require("../../utils/auth");

//Get and post routes
// Get all blogs
router.get('/', (req, res) => {
  Blog.findAll()
    .then(dbBlogData => res.json(dbBlogData))
    .catch(err => {
      console.log(err);
      res.status(500).json(err);
    });
});

// Get a single blog
router.get('/:id', (req, res) => {
  Blog.findOne({
    where: {
      id: req.params.id
    },
    attributes: [
      'title',
      'body',      
      'user_id'
    ],
    include: [
    {
      model: User,
      attributes: ['username']
    }
  ]
  })
    .then(dbBlogData => {
      if (!dbBlogData) {
        res.status(404).json({ message: 'No blog found with this id' });
        return;
      }
      res.json(dbBlogData);
    })
    .catch(err => {
      console.log(err);
      res.status(500).json(err);
    })
});

// Create a recipe
router.post('/', withAuth, async (req, res) => {
  Blog.create({
    title: req.body.title,
    body: req.body.body,    
    user_id: req.session.user_id,

  }).then(dbBlogData => res.json(dbBlogData))
    .catch(err => {
      console.log(err);
      res.status(500).json(err);
    })
})

// Update a blog
router.put('/:id', (req, res) => {
   // pass in req.body instead to only update what's passed through
  Blog.update(req.body, {
    individualHooks: true,
    where: {
      id: req.params.id
    }
  })
    .then(dbBlogData => {
      if (!dbBlogData) {
        res.status(404).json({ message: 'No blog found with this id' });
        return;
      }
      res.json(dbBlogData);
    })
    .catch(err => {
      console.log(err);
      res.status(500).json(err);
    });
});

// Delete a blog
router.delete('/:id', (req, res) => {
  Blog.destroy({
    where: {
      id: req.params.id
    }
  })
  .then(dbBlogData => {
    if (!dbBlogData) {
      res.status(404).json({ message: 'No blog found with this id' });
      return;
    }
    res.json(dbBlogData);
  })
  .catch(err => {
    console.log(err);
    res.status(500).json(err);
  });
})

module.exports  = router;