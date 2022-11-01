const path = require('path')
const express = require('express');
const session = require('express-session');
const routes = require('./controllers');
const exphbs = require('express-handlebars');

require('dotenv').config();

//Heroku port || local port
const app = express();
const PORT = process.env.PORT || 3001;

//import sequelize
const sequelize = require('./config/connection');
const SequelizeStore = require('connect-session-sequelize')(session.Store);

const sess = {
  secret: process.env.Secret,
  cookie: {},
  resave: false,
  saveUninitialized: true,
  store: new SequelizeStore({
    db: sequelize
  })
};

//User session
app.use(session(sess));

const hbs = exphbs.create({});

//turn on handlebars
app.engine('handlebars', hbs.engine);
app.set('view engine', 'handlebars');

// parse incoming JSON data
app.use(express.json());
// parse incoming string or array data
app.use(express.urlencoded({ extended: true }));
//include files in public folder
app.use(express.static(path.join(__dirname, 'public')));
// turn on routes
app.use(routes);

// sync sequelize models to the database, then turn on the server
sequelize.sync({ force: false }).then(() => {
  app.listen(PORT, () => console.log("Now Listening"));
});