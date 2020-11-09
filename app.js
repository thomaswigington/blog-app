/*Constants can be declared with uppercase or lowercase,
but a common convention is to use all-uppercase letters.(and underscores - me)
Constants are block-scoped. It does not mean the value it holds is immutable—just
that the variable identifier cannot be reassigned. The temporal dead zone applies.
The let statement declares a block-scoped local variable.- MDN Web Docs/CONST*/
const express = require('express');
const bodyParser = require('body-parser');
const ejs = require('ejs');
const _ = require('lodash');

//for app.listen- see Express docs
const port = 3000;

const homeStartingContent = "Lacus vel facilisis volutpat est velit egestas dui id ornare. Semper auctor neque vitae tempus quam. Sit amet cursus sit amet dictum sit amet justo. Viverra tellus in hac habitasse. Imperdiet proin fermentum leo vel orci porta. Donec ultrices tincidunt arcu non sodales neque sodales ut. Mattis molestie a iaculis at erat pellentesque adipiscing. Magnis dis parturient montes nascetur ridiculus mus mauris vitae ultricies. Adipiscing elit ut aliquam purus sit amet luctus venenatis lectus. Ultrices vitae auctor eu augue ut lectus arcu bibendum at. Odio euismod lacinia at quis risus sed vulputate odio ut. Cursus mattis molestie a iaculis at erat pellentesque adipiscing.";
const aboutContent = "Hac habitasse platea dictumst vestibulum rhoncus est pellentesque. Dictumst vestibulum rhoncus est pellentesque elit ullamcorper. Non diam phasellus vestibulum lorem sed. Platea dictumst quisque sagittis purus sit. Egestas sed sed risus pretium quam vulputate dignissim suspendisse. Mauris in aliquam sem fringilla. Semper risus in hendrerit gravida rutrum quisque non tellus orci. Amet massa vitae tortor condimentum lacinia quis vel eros. Enim ut tellus elementum sagittis vitae. Mauris ultrices eros in cursus turpis massa tincidunt dui.";
const contactContent = "Scelerisque eleifend donec pretium vulputate sapien. Rhoncus urna neque viverra justo nec ultrices. Arcu dui vivamus arcu felis bibendum. Consectetur adipiscing elit duis tristique. Risus viverra adipiscing at in tellus integer feugiat. Sapien nec sagittis aliquam malesuada bibendum arcu vitae. Consequat interdum varius sit amet mattis. Iaculis nunc sed augue lacus. Interdum posuere lorem ipsum dolor sit amet consectetur adipiscing elit. Pulvinar elementum integer enim neque. Ultrices gravida dictum fusce ut placerat orci nulla. Mauris in aliquam sem fringilla ut morbi tincidunt. Tortor posuere ac ut consequat semper viverra nam libero.";

let posts = [];

const app = express();

/*Basic EJS setup. There is a views directory with a number of .ejs pages.*/
app.set('view engine', 'ejs');

/*Body-Parser: parse incoming request bodies in a middleware before your handlers.
urlencoded: Returns middleware that only parses urlencoded bodies and only looks
at requests where the Content-Type header matches the type option.   */
app.use(bodyParser.urlencoded({extended: true}));

app.use(express.static('public')); //serves static assets such as HTML files, images, and so on.

/*app.METHOD(PATH, HANDLER) where app is an instance of express. METHOD is an HTTP
request method, in lowercase. PATH is a path on the server. HANDLER is the function
executed when the route is matched. Routes HTTP GET requests to the specified path with
the specified callback functions.*/
app.get('/', function(req, res) {
  res.render('home', {                    /*res.render for EJS views*/
    startingContent: homeStartingContent,
    posts: posts
  });

});

app.get('/about', function(req, res) {
  res.render('about', {aboutMe: aboutContent});
});

app.get('/contact', function(req,res) {
  res.render('contact', {callMe: contactContent});
});

app.get('/compose', function(req, res) {
  res.render('compose');
});

app.post('/compose', function(req, res) {
  const post = {
    title: req.body.postTitle,
    content: req.body.postBody
  };
  posts.push(post);
  res.redirect('/');
});

/*Creates dynamic url */
app.get('/posts/:postName', function(req, res){
  const requestedTitle = _.lowerCase(req.params.postName);
/*The forEach() method executes a provided function once for each array element.*/
  posts.forEach(function(post){
    const storedTitle = _.lowerCase(post.title);

    if (storedTitle === requestedTitle) {
      res.render('post', {
        title: post.title,
        content: post.content
      });
    };
  });

});

app.listen(port, function() {
  console.log('Server started on port 3000');
});
