import { combineReducers } from "redux";
import authReducer from "./auth-reducer";
import productReducer from "./products-reducer";
import propertyReducer from "./property-reducer";

export const rootReducer = combineReducers({
  auth: authReducer,
  products: productReducer,
  property: propertyReducer,
});
