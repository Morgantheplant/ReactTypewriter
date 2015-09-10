var React = require('react');
var Router = require('react-router');
var routes = require('./src/config/routes');

Router.run(routes, function(Handler){
  React.render(<Handler />, document.querySelector('#content'))
})


