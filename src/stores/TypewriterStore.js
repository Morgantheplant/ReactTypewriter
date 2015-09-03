var AppDispatcher = require('../dispatcher/AppDispatcher');
var EventEmitter = require('events').EventEmitter;
var TypewriterConstants = require('../constants/TodoConstants');
var assign = require('object-assign');

var CHANGE_EVENT = 'change';

var _text = [];


function addLetter(text) {
  _text.push(text.toUpperCase());
}


var TypewriterStore = assign({}, EventEmitter.prototype, {

  getText: function() {
    return _text;
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
