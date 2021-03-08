import {InitialStatePropertyType, PropertyAction, PropertyTypeActions} from "../types/property";


const initialState: InitialStatePropertyType = {
  properties: [],
  loading: false,
};

const propertyReducer = (state = initialState, action: PropertyAction): InitialStatePropertyType => {
  switch (action.type) {
    case PropertyTypeActions.GET_PROPERTIES_LIST:
      return {
        ...state,
        properties: action.payload,
        loading: false,
      };
    case PropertyTypeActions.LOADING_PROPERTY:
      return {
        ...state,
        loading: true,
      };
    default:
      return state;
  }
};

export default propertyReducer;
