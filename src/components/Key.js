var React = require('react');
var classNames = require('classnames');
var TypewriterActions =  require('../actions/TypewriterActions');

var Key = React.createClass({
    getInitialState: function(){
   	    return {
            isPressed: false
   	    }
    },
    createBorder: function(){
   	    var index = this.props.num,
   	    isPressed = this.state.isPressed,
   	    style = {};
      
        // left side of keyboard
   	    if(index < 4 ){
   	        style.boxShadow = "1px 1px 1px white, 2px 2px 5px white, 3px 3px 3px #C2C2C2";
   	    // handle dynamic button pressed animations
   	        if(isPressed){
   	            style.transform = "translate(5px,8px) rotateX(20deg)";
   	        }
   	    }
      
        // middle of keyboard
   	    if(index >= 4 && index < 8){
   	  	    style.boxShadow = "0px 1px 1px white, 0px 2px 5px white, 0px 3px 3px #C2C2C2";
   	        //handle button down animation
   	        if(isPressed){
   	            style.transform = "translate(0px,8px) rotateX(25deg)";
   	        }
   	    }
      
        // right side of keyboard
   	    if(index >= 8 ){
   	  	    style.boxShadow = "-1px 1px 1px white, -2px 2px 5px white, -3px 3px 3px #C2C2C2";
   	        //handle button down animation
   	        if(isPressed){
   	    	    style.transform = "translate(-5px,8px) rotateX(20deg)";
   	        }
   	    }
    
   	    return style;
    },
    createKeyText: function(){
       	return this.props.keyName.toUpperCase();
    },
    render: function(){
        return (
            <div className={classNames({
                'keyboard-key': true,
                'keyboard-key-pressed': this.state.isPressed
            })} style={ this.createBorder() } onClick={ this._onClickedKeyboard } >
            { this.createKeyText() }
            </div>
      );
    },
    _onClickedKeyboard: function(e){
        if(e){
           e.stopPropagation();
        }
        TypewriterActions.keyPressed(this.props.keyName);

   	    this.setState({isPressed:true});
   	    setTimeout(function(){
            this.setState({isPressed:false});
   	    }.bind(this),300);
   }
});

module.exports = Key;
