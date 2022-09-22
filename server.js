const express = require('express');
const mongoose = require('mongoose');
const routes = require('./routes');

const app = express();
const PORT = process.env.PORT || 3001;

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(require(routes));

mongoose.connect(
  process.env.MONGODB_URI || 'mongodb://127.0.0.1:27017/socialite',
  {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  }
);

// to log mongoose queries to db
mongoose.set('debug', true);

mongoose.once('open', () => {
  app.listen(PORT, () => console.log(`Connected on localhost:${PORT}`));
});