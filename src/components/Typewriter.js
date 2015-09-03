var React = require('react');
var Keyboard = require('./Keyboard');
var Spacebar = require('./Spacebar');
var Paper = require('./Paper');
var TypewriterStore = require('../stores/TypewriterStore');


function getTypewriterState() {
    return {
        paperText:  TypewriterStore.getText()
    };
}


var Typewriter = React.createClass({
    getInitialState: function(){
        return getTypewriterState();
    },
    componentDidMount: function() {
        TypewriterStore.addChangeListener(this._onChange);
    },

    componentWillUnmount: function() {
        TypewriterStore.removeChangeListener(this._onChange);
    },
    render: function(){
      return (
        <div className="wrapper">
	        <Paper text={ this.state.paperText } />
	        <div className="typewriter">
	            <img className="base" src="./images/base.png" alt="typewriter base" />
	            <Keyboard />
	            <Spacebar />
	        </div>
        </div>
      )
   },
   _onChange: function(){
   	  this.setState(getTypewriterState())
   }
});

module.exports = Typewriter;


