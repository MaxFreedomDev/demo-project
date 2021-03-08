import {InitialStateProductType, ProductAction, ProductActionTypes} from "../types/product";


const initialState: InitialStateProductType = {
  items: [],
  item: {date: "", description: "", id: "", name: "", picture: "", price: ""},
  url: null,
  loading: false,
  loadingFile: false,
  openDialogEvent: false,
};

  const productReducer = (state = initialState, action: ProductAction): InitialStateProductType => {
  switch (action.type) {
    case ProductActionTypes.GET_PRODUCTS_LIST:
      return {
        ...state,
        items: action.payload,
        loading: false,
      };
    case ProductActionTypes.GET_PRODUCT_DATA:
      return {
        ...state,
        item: action.payload,
        loading: false,
      };
    case ProductActionTypes.LOADING_PRODUCTS:
      return {
        ...state,
        loading: true,
      };
    case ProductActionTypes.GET_PRODUCT_PHOTO_URL:
      return {
        ...state,
        url: action.payload,
        loadingFile: false,
      };
    case ProductActionTypes.FILE_LOADED:
      return {
        ...state,
        loadingFile: true,
      };
    case ProductActionTypes.CREATE_EVENT:
      return {
        ...state,
        openDialogEvent: action.payload,
      };
    default:
      return state;
  }
};

export default productReducer;
