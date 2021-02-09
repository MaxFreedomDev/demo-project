const updateAuth = (state, action) => {
  if (state === undefined) {
    return {
      user: null,
      error: null,
    };
  }
  switch (action.type) {
    case "SET_ERROR":
      return {
        ...state.auth,
        error: action.payload,
      };
    case "SET_USER":
      return {
        ...state.auth,
        user: action.payload,
      };
    default:
      return state.auth;
  }
};

export default updateAuth;
