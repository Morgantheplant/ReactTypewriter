var React = require('react');

var Paper = React.createClass({
   render: function(){
      return (
        <div className="typewriter-paper-container">
           <img className="typewriter-carriage" src="./images/carriage.png" />
          <div className="typewriter-paper">{ this.props.text.join("") }</div>
        </div>
      )
   }
});

module.exports = Paper;