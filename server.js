const express = require('express');
const articleRouter = require('./routes/articles');
const methodOverride = require('method-override');
const app = express();
const mongoose = require('mongoose');
const Article = require('./models/article')

mongoose.connect('mongodb://localhost/blog', {
  useNewUrlParser: true,
 useUnifiedTopology: true,
 useCreateIndex: true
});

app.set('view engine', 'ejs'); // template to pass in HTML

app.use(express.urlencoded({ extended: false }));
app.use(methodOverride('_method'))

app.get('/', async (req, res) => { // homepage route
  
  const articles = await Article.find().sort({
    createdAt: 'desc'
  })
  res.render('articles/index', { articles: articles })        // path to HTML template
});

app.use('/articles', articleRouter); // path for articles set

app.listen(5000);            // PORT