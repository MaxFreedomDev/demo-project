import updateAuth from "./auth";
import updateProducts from "./products";
import updateProperty from "./property";

const reducer = (state, action) => {
  return {
    auth: updateAuth(state, action),
    products: updateProducts(state, action),
    property: updateProperty(state, action),
  };
};

export default reducer;
