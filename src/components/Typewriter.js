var React = require('react');
var Keyboard = require('./Keyboard');
var Spacebar = require('./Spacebar');
var Paper = require('./Paper');
var Foot = require('./Foot');
var TypewriterStore = require('../stores/TypewriterStore');

function getTypewriterState() {
    return {
        paperText:  TypewriterStore.getText(),
        layoutCarriage: TypewriterStore.getCarriageLayout(),
    };
}

var Typewriter = React.createClass({
    getInitialState: function(){
        return getTypewriterState();
    },
    componentDidMount: function() {
        TypewriterStore.addChangeListener(this._onChange);
        this._addTypingListener();
    },
    componentWillUnmount: function() {
        TypewriterStore.removeChangeListener(this._onChange);
        window.removeEventListener('keydown')
    },
    render: function(){
      return (
        <div className="wrapper">
	        <Paper layout={ this.state.layoutCarriage } text={ this.state.paperText } />
            <div className="typewriter">
                <img className="base" src="./images/base.png" alt="typewriter base" />
                <Keyboard ref="keyboard" />
                <Spacebar ref="spacebar" />
            </div>
            <Foot />
        </div>
      );
    },
    _onChange: function(){
   	    this.setState(getTypewriterState())
    },
    _addTypingListener: function(){
        window.addEventListener('keydown', function(e){
            // handle different browser keydown events
            var code = (e.key) ? e.key : e.keyCode || e.which;
             //check if key code is a letter
            if(code >= 65 && code < 90){
                //make sure ref and method exist
                if(this.refs.keyboard && this.refs.keyboard._triggerKeyClick){
                    var letter = String.fromCharCode(code)
                    this.refs.keyboard._triggerKeyClick(letter)
                }
            }
            //check if keycode is a number
            if( code >= 48 && code < 58){
                if(this.refs.keyboard && this.refs.keyboard._triggerKeyClick){
                    var number = String.fromCharCode(code)
                    this.refs.keyboard._triggerKeyClick(number)
                }
            }
            //check if key is spacebar
            if( code === 32){
                if(this.refs.keyboard && this.refs.keyboard._triggerKeyClick){
                    this.refs.spacebar._onClickedSpace()
                }
            }
        }.bind(this))
    }
});

module.exports = Typewriter;


