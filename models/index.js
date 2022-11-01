const User = require("./User");
const Blog = require("./Blog");

// User belongsTo BLOGS
Blog.belongsTo(User, {
    foreignKey: "user_id",
    onDelete: "CASCADE",
});

// USER have many BLOGS
User.hasMany(Blog, {
  foreignKey: "user_id"
});


module.exports = {
  User,
  Blog,  
};