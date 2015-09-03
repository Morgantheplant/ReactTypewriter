var React = require('react');
var classNames = require('classnames');
var TypewriterActions =  require('../actions/TypewriterActions');

var SpaceBar = React.createClass({
    getInitialState: function(){
    	return {
    		isPressed: false
    	}
    },
    render: function(){
        return (
            <img  className={ classNames({
          'keyboard-spacebar': true,
          'keyboard-spacebar-pressed': this.state.isPressed
        })} src="./images/spacebar.png" alt="SpaceBar spacebar" onClick={ this._onClickedSpace } />
        )
    },
    _onClickedSpace: function(){
      TypewriterActions.keyPressed("\u00A0")
   	  this.setState({isPressed:true})
   	  setTimeout(function(){
        this.setState({isPressed:false})
   	  }.bind(this),300);
   }
});

module.exports = SpaceBar;


