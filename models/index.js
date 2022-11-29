const User = require("./User");
const Blog = require("./Blog");

// User belongsTo BLOGS
Blog.belongsTo(User, {
    foreignKey: "username",
    onDelete: "CASCADE",
});

// USER have many BLOGS
User.hasMany(Blog, {
  foreignKey: "username"
});


module.exports = {
  User,
  Blog,  
};