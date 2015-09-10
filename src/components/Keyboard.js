var React = require('react');
var Key = require('./Key');
var keydata = require('../constants/keydata');

var Keyboard = React.createClass({
   createKeys: function(item, index){
     return <Key ref={item[0]} key={ item[0]+index } keyName={ item[0] } num={ index } />
   },
   createRow: function(rowNum){
      return keydata[rowNum].map(this.createKeys) 
   },
   render: function(){
        return (
            <div className="keyboard-container">
                <p>{ this.createRow("row1") }</p> 
                <p>{ this.createRow("row2") }</p>
                <p>{ this.createRow("row3") }</p>
                <p>{ this.createRow("row4") }</p>
            </div>
        );
   },
   _triggerKeyClick: function(raw){
        var value = raw.toLowerCase();
        if(this.refs[value]&& this.refs[value]._onClickedKeyboard){
            this.refs[value]._onClickedKeyboard()
        }
    }
});

module.exports = Keyboard;
