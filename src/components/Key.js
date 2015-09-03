var React = require('react');

var Key = React.createClass({
   createBorder: function(index){
   	  var style = {}

   	  if(index < 4 ){
   	    style.boxShadow = "1px 1px 1px white, 2px 2px 5px white, 3px 3px 3px #C2C2C2";
   	  }

   	  if(index >= 4 && index < 7){
   	  	style.boxShadow = "0px 1px 1px white, 0px 2px 5px white, 0px 3px 3px #C2C2C2";
   	  }

   	  if(index >= 7 ){
   	  	style.boxShadow = "-1px 1px 1px white, -2px 2px 5px white, -3px 3px 3px #C2C2C2";
   	  }

   	  return style;
   },
   render: function(){
      return (
        <div className="keyboard-key" style={ this.createBorder(this.props.num) }>
         { this.props.keyName }
        </div>
      )
   }
});

module.exports = Key;
