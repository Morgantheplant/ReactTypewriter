var AppDispatcher = require('../dispatcher/AppDispatcher');
var EventEmitter = require('events').EventEmitter;
var TypewriterConstants = require('../constants/TodoConstants');
var assign = require('object-assign');

var CHANGE_EVENT = 'change';

//will hold the lines of text
var _text = [ [], [], [] ];

var _init = {
  carriageTop:170, 
  carriageLeft:-77,
  paperTop:186,
  paperLeft: 82,
  paperHeight: 17
};

var _carriagePositions = {
  carriageTop:_init.carriageTop, 
  carriageLeft:_init.carriageLeft,
  paperTop:_init.paperTop,
  paperLeft:_init.paperLeft,
  paperHeight: _init.paperHeight
};

var _currentPaperLine = 0;
var _columnCount = 0;
var _rowCount = 0;
console.log(_columnCount, 'here');

function addLetter(text) {
  console.log(_columnCount)
  if(_columnCount < 35 ){
    simulateTyping(text);
  } else {
    resetCarriage();
  }

}

function simulateTyping(text){
  //create array for line if it doesnt exist
  var line = (_text[_currentPaperLine]) ? _text[_currentPaperLine] : [];
  line.push(text.toUpperCase());
  _carriagePositions.paperLeft -= 4.7;
  _carriagePositions.carriageLeft -= 4.7;
  _columnCount++;
}

function resetCarriage(){
  if(_rowCount<20){
    _currentPaperLine++;
    _columnCount = 0;
    _rowCount++;
    _carriagePositions.paperTop -= 10;
    _carriagePositions.carriageLeft = _init.carriageLeft;
    _carriagePositions.paperLeft = _init.paperLeft;
    _carriagePositions.paperHeight += 10;
  }
}

var TypewriterStore = assign({}, EventEmitter.prototype, {

  getText: function() {
    return _text;
  },

  getCarriageLayout: function(){
    return _carriagePositions;
  },

  emitChange: function() {
    this.emit(CHANGE_EVENT);
  },

  /**
   * @param {function} callback
   */
  addChangeListener: function(callback) {
    this.on(CHANGE_EVENT, callback);
  },

  /**
   * @param {function} callback
   */
  removeChangeListener: function(callback) {
    this.removeListener(CHANGE_EVENT, callback);
  }
});

// Register callback to handle all updates
AppDispatcher.register(function(action) {
  var text;

  switch(action.actionType) {
    case TypewriterConstants.KEY_PRESS:
        text = action.text;
        addLetter(text);
        TypewriterStore.emitChange();
      break;

    default:
      // no op
  }
});

module.exports = TypewriterStore;
