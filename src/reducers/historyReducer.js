import {merge} from 'lodash';
const defaultState = {
    prev:{
        tree:{}
    }
};

const historyReducer = (state = defaultState, action) => {
  switch (action.type) {
    // remember not to mutate the state
     case 'HISTORY_ADD':
        return merge({},state,action.val);
    default:
        return state;
  }
};

export default historyReducer;
