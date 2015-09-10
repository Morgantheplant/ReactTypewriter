var React = require('react');
var Typewriter = require('../components/Typewriter');
var Router = require('react-router');
var Route = Router.Route;
var BookCollection = require('../components/BookCollection');
var NotFound = require('../components/NotFound')

module.exports = (
    <Route> 
      <Route path="/" handler={Typewriter}></Route>
	  <Route path="pages" handler={BookCollection}></Route>
    </Route>
);