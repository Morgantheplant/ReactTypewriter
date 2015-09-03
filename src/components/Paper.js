var React = require('react');

var Paper = React.createClass({
   createPaperLines:function(){
       return this.props.text.map(this.createLine);
   },
   createLine: function(line, index){
   	  var lineStr = line.join(""); 
   	  return <span key={line+index}>{ lineStr } <br /> </span>
   },
   render: function(){
   	  var paperStyles = {
   	  	top: this.props.layout.paperTop + 'px',
   	  	left: this.props.layout.paperLeft +'px',
   	  	height: this.props.layout.paperHeight + 'px'
   	  };
   	  console.log(paperStyles)
      var carriageStyles = {
   	  	top: this.props.layout.carriageTop + 'px',
   	  	left: this.props.layout.carriageLeft +'px',
   	  };

      return (
        <div className="typewriter-paper-container">
           <img style={ carriageStyles } className="typewriter-carriage" src="./images/carriage.png" />
          <div style={ paperStyles } className="typewriter-paper">{ this.createPaperLines() }</div>
        </div>
      )
   }
});

module.exports = Paper;