import fire from "../firebase";

const db = fire.database();

export const fileLoaded = () => {
  return {
    type: "FILE_LOADED",
  };
};
export const loadingProducts = () => {
  return {
    type: "LOADING_PRODUCTS",
  };
};
export const getProductsList = (data) => {
  return {
    type: "GET_PRODUCTS_LIST",
    payload: data,
  };
};
export const getProductData = (data) => {
  return {
    type: "GET_PRODUCT_DATA",
    payload: data,
  };
};
export const getProductPhotoURL = (url) => {
  return {
    type: "GET_PRODUCT_PHOTO_URL",
    payload: url,
  };
};
export const createEvent = (boolean) => {
  return {
    type: "CREATE_EVENT",
    payload: boolean,
  };
};

export const getProducts = () => (dispatch) => {
  dispatch(loadingProducts());
  db.ref(`product`).on("value", (snap) => {
    let data = snap.val();
    if (data === null) {
      return null;
    }
    dispatch(getProductsList(data));
  });
};

export const getProduct = (id) => (dispatch) => {
  db.ref(`/product/${id}`).on("value", (snap) => {
    let data = snap.val();
    if (data === null) {
      return null;
    }
    dispatch(getProductData(data));
  });
};
export const createProduct = (payload) => (dispatch) => {
  db.ref("product")
    .child(`${payload.id}`)
    .set(payload)
    .then(() => {
      dispatch(createEvent(true));
    });
};
export const updateProduct = (id, payload) => (dispatch) => {
  db.ref(`product`)
    .child(`${id}`)
    .set(payload)
    .then(() => {
      dispatch(createEvent(true));
    });
};
export const deleteProduct = (id) => (dispatch) => {
  db.ref("product")
    .child(`${id}`)
    .remove()
    .then(() => {
      dispatch(getProducts);
    });
};
export const uploadFile = (file) => async (dispatch) => {
  dispatch(fileLoaded());
  const storageRef = fire.storage().ref();
  const fileRef = storageRef.child(file.name);
  await fileRef.put(file);
  await fileRef
    .getDownloadURL()
    .then((url) => {
      dispatch(getProductPhotoURL(url));
    })
    .catch((err) => {
      console.log(err);
    });
};
