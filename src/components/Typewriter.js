var React = require('react');
var Keyboard = require('./Keyboard');

var Typewriter = React.createClass({
   render: function(){
      return (
        <div className="typewriter">
          <img className="base" src="./images/base.png" alt="typewriter base" />
          <Keyboard />
          <img className="typewriter-keys-spacebar" src="./images/spacebar.png" alt="typewriter spacebar" />
        </div>
      )
   }
});

module.exports = Typewriter;
