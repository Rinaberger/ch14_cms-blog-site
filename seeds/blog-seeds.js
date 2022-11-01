const { Blog } = require('../models');

const blogData = [
  {
    title: 'Aristotle and Bootcamps',
    body: "We are finally at the point in bootcamp that reminds me of how Aristotle reversed his teachings to say 'All that you have learned isn't relevant'",
    user_id: 1,   
  },

  {
    title: 'Learn Everything In One Week!',
    body: "Bootcamps are a wonderful way to learn many new learnings but it is a major time commitment. One must also understand that the deep dives are done outside of the work as well as after the bootcamp ends. But, it is a wonderful opportunity for those who are self learners.",
    user_id: 2,    
  },
  
];

const seedBlog = () => Blog.bulkCreate(blogData);

module.exports = seedBlog;