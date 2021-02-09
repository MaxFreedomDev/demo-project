const updateProducts = (state, action) => {
  if (state === undefined) {
    return {
      cars: [],
      car: {},
      url: null,
      loading: false,
      loadingFile: false,
      openDialogEvent: false,
    };
  }

  switch (action.type) {
    case "GET_PRODUCTS_LIST":
      return {
        ...state.products,
        cars: action.payload,
        loading: false,
      };
    case "GET_PRODUCT_DATA":
      return {
        ...state.products,
        car: action.payload,
        loading: false,
      };
    case "LOADING_PRODUCTS":
      return {
        ...state.products,
        loading: true,
      };
    case "GET_PRODUCT_PHOTO_URL":
      return {
        ...state.products,
        url: action.payload,
        loadingFile: false,
      };
    case "FILE_LOADED":
      return {
        ...state.products,
        loadingFile: true,
      };
    case "CREATE_EVENT":
      return {
        ...state.products,
        openDialogEvent: action.payload,
      };
    default:
      return state.products;
  }
};

export default updateProducts;
