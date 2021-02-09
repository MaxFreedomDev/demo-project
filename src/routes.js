import {
  CREATE_PRODUCT_ROUTE,
  CREATE_PROPERTY_ROUTE,
  LOGIN_ROUTE,
  MAIN_ROUTE,
  PRODUCT_ROUTE,
  REGISTRATION_ROUTE,
} from "./utils/const";
import Login from "./components/login/login";
import Main from "./components/pages/main/main";
import Registration from "./components/login/registration";
import Product from "./components/pages/product/product";
import CreateProduct from "./components/pages/create-item/create-product/create-product";
import CreateProperty from "./components/pages/create-item/create-property/create-property";

export const publicRoutes = [
  {
    path: LOGIN_ROUTE,
    Component: Login,
  },
  {
    path: REGISTRATION_ROUTE,
    Component: Registration,
  },
];

export const privateRoutes = [
  {
    path: MAIN_ROUTE,
    Component: Main,
  },
  {
    path: PRODUCT_ROUTE,
    Component: Product,
  },
  {
    path: CREATE_PRODUCT_ROUTE,
    Component: CreateProduct,
  },
  {
    path: CREATE_PROPERTY_ROUTE,
    Component: CreateProperty,
  },
];
