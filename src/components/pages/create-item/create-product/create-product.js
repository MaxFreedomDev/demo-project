import React, { useEffect } from "react";
import "./create-product.scss";
import { withRouter } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
  createProduct,
  getProductPhotoURL,
  updateProduct,
  uploadFile,
} from "../../../../actions/products";
import { MAIN_ROUTE } from "../../../../utils/const";
import CustomInput from "../../../controls/custom-input";
import HeaderCreate from "../header-create";
import { Formik } from "formik";
import { formatDate } from "../../../../utils/func";
import AddPropertyForProduct from "./add-property-for-product";
import Success from "../../../modal/success";

const CreateProduct = (props) => {
  const dispatch = useDispatch();
  const items = useSelector((state) => state.products.items);
  const url = useSelector((state) => state.products.url);
  const loading = useSelector((state) => state.products.loadingFile);
  const openDialogEvent = useSelector(
    (state) => state.products.openDialogEvent
  );
  const product = props.location?.state;
  const id = product?.id || "";
  const name = product?.name || "";
  const price = product?.price || "";
  const description = product?.description || "";
  const picture = product?.picture || url || "";
  const properties = product?.properties || [];

  useEffect(() => {
    if (!product) {
      document.title = "Добавление товара";
      dispatch(getProductPhotoURL(""));
    } else return (document.title = "Изменение товара");
  }, [dispatch, product]);

  const fileHandler = (event) => {
    const file = event.target.files[0];
    if (file) {
      return dispatch(uploadFile(file));
    }
  };
  const addProduct = (values) => {
    const item = {
      ...values,
      id: items.length > 0 ? items[items.length - 1].id + 1 : 0,
      date: formatDate(new Date()),
      picture: url || product.picture,
    };
    if (!product) {
      return dispatch(createProduct(item));
    }
    const id = product.id;
    dispatch(updateProduct(id, { ...item, id }));
    dispatch(getProductPhotoURL(null));
  };

  return (
    <div className="contentWrapper">
      <Formik
        initialValues={{
          id: id,
          name: name,
          price: price,
          description: description,
          picture: picture,
          properties: properties,
        }}
        validate={(values) => {
          const errors = {};
          if (!values.name) {
            errors.name = "Поле не должно быть пустым";
          } else if (!product && items.find((el) => el?.name === values.name)) {
            errors.name = "Такое имя уже существует";
          }
          if (!values.price) {
            errors.price = "Поле не должно быть пустым";
          } else if (!/[0-9]/.test(values.price)) {
            errors.price = "Поле должно состоять только из цифр";
          }
          if (!values.picture) {
            errors.picture = "Выберите изображение";
          }
          return errors;
        }}
        onSubmit={(values, { setSubmitting, resetForm }) => {
          setSubmitting(false);
          addProduct(values);
          if (!product) {
            resetForm();
          }
        }}
      >
        {({
          values,
          errors,
          touched,
          handleChange,
          handleSubmit,
          isSubmitting,
          setFieldValue,
        }) => (
          <form onSubmit={handleSubmit}>
            <HeaderCreate
              link={MAIN_ROUTE}
              item={product}
              title={product ? "Изменение товара" : "Добавление товара"}
              type="submit"
              disabled={isSubmitting || loading}
            />
            <div className="createItemBody">
              <CustomInput
                name="Название товара"
                nameInput="name"
                value={values.name}
                onChangeForm={handleChange}
                sup
              />
              <span className="textError">
                {errors.name && touched.name && errors.name}
              </span>
              <CustomInput
                name="Стоимость товара"
                nameInput="price"
                price
                sup
                value={values.price}
                onChangeForm={handleChange}
              />
              <span className="textError">
                {errors.price && touched.price && errors.price}
              </span>
              <CustomInput
                fileName={product && "image"}
                nameInput="picture"
                name="Изображение"
                sup
                type="file"
                value={values.picture}
                fileHandler={fileHandler}
                setFieldValue={setFieldValue}
              />
              <span className="textError">
                {errors.picture && touched.picture && errors.picture}
              </span>
              <CustomInput
                name="Описание"
                textarea
                nameInput="description"
                value={values.description}
                onChangeForm={handleChange}
              />
            </div>
            <AddPropertyForProduct
              values={values.properties}
              handleChangeForm={handleChange}
            />
          </form>
        )}
      </Formik>
      {openDialogEvent && (
        <Success
          open={openDialogEvent}
          label={!product ? "Товар добавлен" : "Товар изменен"}
        />
      )}
    </div>
  );
};

export default withRouter(CreateProduct);
