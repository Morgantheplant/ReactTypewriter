var AppDispatcher = require('../dispatcher/AppDispatcher');
var TypewriterConstants = require('../constants/TodoConstants');

var TypewriterActions = {

  keyPressed: function(value) {
  	console.log('dispatching')
    AppDispatcher.dispatch({
      actionType: TypewriterConstants.KEY_PRESS,
      text: value
    });
  }

};

module.exports = TypewriterActions;
