import {AuthAction, AuthActionTypes, InitialStateAuthType} from "../types/auth";

const initialState: InitialStateAuthType = {
    user: null,
    error: null,
};

const authReducer = (state = initialState, action: AuthAction): InitialStateAuthType => {

  switch (action.type) {
    case AuthActionTypes.SET_ERROR:
      return {
        ...state,
        error: action.payload,
      };
    case AuthActionTypes.SET_USER:
      return {
        ...state,
        user: action.payload,
      };
    default:
      return state;
  }
};

export default authReducer;
