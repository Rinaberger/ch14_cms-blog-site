const { User } = require("../models");

const userData = [
  {
    id: 1,
    username: "technowizard",
    email: "techno@email.com",
    password: "1234",
  },
  {
    id: 2,
    username: "blogguru",
    email: "daddio@email.com",
    password: "1234",
  },
  
];

const seedUser = () => User.bulkCreate(userData,{individualHooks: true});

module.exports = seedUser;