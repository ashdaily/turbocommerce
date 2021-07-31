import { AUTH_USER, LOGOUT_USER, SET_PROFILE, GET_PROFILE_INIT } from '../actions/Auth.action';

const initialState = {
  error: false,
  message: '',
  user: {},
  user_profile: {},
  is_authenticated: true
};

export default function (state = JSON.parse(JSON.stringify(initialState)), action) {
  switch (action.type) {
    case AUTH_USER: {
      return { ...state, is_authenticated: true, user: action.payload };
    }
    case LOGOUT_USER: {
      return { ...state, ...JSON.parse(JSON.stringify(initialState)) };
    }
    case GET_PROFILE_INIT: {
      const tempProfile = state.user_profile;
      tempProfile.is_fetching = true;
      return {
        ...state,
        user_profile: tempProfile
      };
    }
    case SET_PROFILE: {
      const tempProfile = action.payload;
      tempProfile.is_fetching = false;
      tempProfile.is_verified = true;
      return { ...state, user_profile: tempProfile };
    }
    default: {
      return state;
    }
  }
}
