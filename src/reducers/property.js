const updateProperty = (state, action) => {
  if (state === undefined) {
    return {
      properties: [],
      loading: false,
    };
  }
  switch (action.type) {
    case "GET_PROPERTIES_LIST":
      return {
        ...state.products,
        properties: action.payload,
        loading: false,
      };
    case "LOADING_PROPERTY":
      return {
        ...state.products,
        loading: true,
      };
    default:
      return state.property;
  }
};

export default updateProperty;
