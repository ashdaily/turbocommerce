import {
  STORE_INFORMATION_LIST_INIT,
  STORE_INFORMATION_LIST_DONE
} from '../actions/StoreInformation.action';

const initialState = {
  is_fetching: false,
  store_infos: []
};

export default function (state = initialState, action) {
  switch (action.type) {
    case STORE_INFORMATION_LIST_INIT: {
      return {
        ...state,
        is_fetching: true,
        store_infos: []
      };
    }
    case STORE_INFORMATION_LIST_DONE: {
      const tempData = action.payload;
      return {
        ...state,
        is_fetching: false,
        store_infos: tempData
      };
    }
    default: {
      return state;
    }
  }
}
