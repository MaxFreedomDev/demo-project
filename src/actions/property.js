import fire from "../firebase";
import { createEvent } from "./products";
const db = fire.database();

const getPropertiesList = (properties) => {
  return {
    type: "GET_PROPERTIES_LIST",
    payload: properties,
  };
};
export const loadingProperty = () => {
  return {
    type: "LOADING_PROPERTY",
  };
};

export const getProperties = () => (dispatch) => {
  dispatch(loadingProperty());
  db.ref(`property`).on("value", (snap) => {
    let data = snap.val();
    if (data === null) {
      return null;
    }
    dispatch(getPropertiesList(data));
  });
};

export const createProperty = (payload) => (dispatch) => {
  db.ref("property")
    .child(`${payload.id}`)
    .set(payload)
    .then(() => {
      dispatch(createEvent(true));
    });
};

export const deleteProperty = (id) => (dispatch) => {
  db.ref("property")
    .child(`${id}`)
    .remove()
    .then(() => {
      dispatch(getProperties);
    });
};
