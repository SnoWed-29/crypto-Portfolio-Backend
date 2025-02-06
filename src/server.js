const express = require('express');
const cookieParser = require('cookie-parser');
const cors = require('cors');
const session = require('express-session');
const passport = require('./config/passport');
require("dotenv").config();
const router = require("./routes");
const sequelize = require('./database/db');
const User = require('./models/user.model');

const app = express();
const PORT = process.env.PORT || 8080;

app.use(cors({
  origin: 'http://localhost:5173',
  credentials: true
}));
app.use(express.json());
app.use(cookieParser());

app.use(session({
  secret: process.env.SESSION_SECRECT_KEY,
  resave: false,
  saveUninitialized: false
}));
app.use(passport.initialize());
app.use(passport.session());
app.use(router);

app.get('/', (req, res) => {
  res.send('Hello World');
});

sequelize.sync()
  .then(() => {
    app.listen(PORT, () => {
      console.log(`Listening on port ${PORT}`);
    });
  })
  .catch(err => {
    console.error('Unable to connect to the database:', err);
  });
