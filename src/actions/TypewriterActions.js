var AppDispatcher = require('../dispatcher/AppDispatcher');
var TypewriterConstants = require('../constants/TypewriterConstants');

var TypewriterActions = {

    keyPressed: function(value) {
        AppDispatcher.dispatch({
            actionType: TypewriterConstants.KEY_PRESS,
            text: value
        });
    },

    resetAll: function(){
  	    AppDispatcher.dispatch({
  		    actionType: TypewriterConstants.RESET_ALL
  	    })
    }

};

module.exports = TypewriterActions;
