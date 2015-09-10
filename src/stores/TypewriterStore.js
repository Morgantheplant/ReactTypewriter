var AppDispatcher = require('../dispatcher/AppDispatcher');
var EventEmitter = require('events').EventEmitter;
var TypewriterConstants = require('../constants/TypewriterConstants');
var assign = require('object-assign');

var CHANGE_EVENT = 'change';

if(window.sessionStorage){
  var init = window.sessionStorage.getItem("typewriterState"),
  prevState = JSON.parse(init);
  prevState = prevState || {};
}

//will hold the lines of text
var _text = prevState.text || [],

 _init = {
  carriageTop:170, 
  carriageLeft:-77,
  paperTop:186,
  paperLeft: 82,
  paperHeight: 17
},

_currentPositions = prevState.savedPositions || {
  carriageTop:_init.carriageTop, 
  carriageLeft:_init.carriageLeft,
  paperTop:_init.paperTop,
  paperLeft:_init.paperLeft,
  paperHeight: _init.paperHeight
},

_currentLetter,
_currentPaperLine = prevState.currentPaperLine || 0,
_columnCount = prevState.columnCount || 0,
_rowCount = prevState.rowCount || 0;

function addLetter(text) {
    if(_columnCount < 35 ){
        simulateTyping(text);
        updateSessionStorage();
    } else {
        resetCarriage();
        simulateTyping(text);
    }
}

function simulateTyping(text){
    //create array for line if it doesnt exist
    _text[_currentPaperLine] = (_text[_currentPaperLine]===undefined)? [] :_text[_currentPaperLine];
    var line = _text[_currentPaperLine];

    line.push(text.toUpperCase());
    _currentPositions.paperLeft -= 4.7;
    _currentPositions.carriageLeft -= 4.7;
    _columnCount++;
}

function resetCarriage(){
    if(_rowCount<20){
        _currentPaperLine++;
        _columnCount = 0;
        _rowCount++;
        _currentPositions.paperTop -= 10;
        _currentPositions.carriageLeft = _init.carriageLeft;
        _currentPositions.paperLeft = _init.paperLeft;
        _currentPositions.paperHeight += 10;
    } 
}

function updateSessionStorage(){
  var storage = {
    text: _text,
    savedPositions: _currentPositions,
    currentPaperLine: _currentPaperLine,
    columnCount: _columnCount,
    rowCount: _rowCount
  }
  window.sessionStorage.setItem("typewriterState", JSON.stringify(storage))
}

function resetPage(){
  _text = [],
  _currentPositions = {
    carriageTop:170, 
    carriageLeft:-77,
    paperTop:186,
    paperLeft: 82,
    paperHeight: 17
  };
  _currentPaperLine = 0;
  _columnCount = 0;
  _rowCount = 0;
  prevState = {};
  window.sessionStorage.setItem("typewriterState", null)
}

var TypewriterStore = assign({}, EventEmitter.prototype, {

    getText: function() {
        return _text;
    },

    getCarriageLayout: function(){
        return _currentPositions;
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
    case TypewriterConstants.RESET_ALL:
           resetPage()
           TypewriterStore.emitChange();
          break;
    default:
      // no op
    }
});

module.exports = TypewriterStore;
