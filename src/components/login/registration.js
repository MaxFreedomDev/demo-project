import React, { useState } from "react";
import { Link } from "react-router-dom";
import { LOGIN_ROUTE } from "../../utils/const";
import Container from "@material-ui/core/Container";
import Grid from "@material-ui/core/Grid";
import { Formik } from "formik";
import VisibilityOn from "@material-ui/icons/VisibilityOutlined";
import VisibilityOff from "@material-ui/icons/VisibilityOffOutlined";
import { useDispatch, useSelector } from "react-redux";
import { setError, signUp } from "../../actions/auth";
import CustomButton from "../controls/custom-button";

const Registration = () => {
  const dispatch = useDispatch();
  const errorServer = useSelector((state) => state.auth.error);
  const [passwordShown, setPasswordShown] = useState(false);
  const [confirmPasswordShown, setConfirmPasswordShown] = useState(false);
  return (
    <Container>
      <Grid
        container
        style={{ height: window.innerHeight - 50 }}
        alignItems={"center"}
        justify={"center"}
      >
        <div className="formWrapper">
          <h2>Регистрация</h2>
          {errorServer && <div className="error">{errorServer}</div>}
          <Formik
            initialValues={{
              email: "",
              password: "",
              confirm_password: "",
              first_name: "",
              last_name: "",
            }}
            validate={(values) => {
              const errors = {};
              const passwordRegex = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])\w{8,}$/;
              if (!values.first_name) {
                errors.first_name = "Поле не должно быть пустым";
              }
              if (!values.last_name) {
                errors.last_name = "Поле не должно быть пустым";
              }
              if (!values.email) {
                errors.email = "Поле не должно быть пустым";
              } else if (
                !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(values.email)
              ) {
                errors.email = "Неверный формат email";
              }
              if (!values.password) {
                errors.password = "Поле не должно быть пустым";
              } else if (values.password.length < 8) {
                errors.password =
                  "Пароль должен состоять минимум из 8 символов";
              } else if (!passwordRegex.test(values.password)) {
                errors.password =
                  "Пароль должен состоять из 8 или более символов латинского алфавита, содержать заглавные и строчные буквы, цифры.";
              }
              if (values.confirm_password !== values.password) {
                errors.confirm_password = "Пароль не совпадает";
              }
              return errors;
            }}
            onSubmit={(values, { setSubmitting }) => {
              setSubmitting(false);
              const { email, password } = values;
              dispatch(signUp(email, password));
            }}
          >
            {({
              values,
              errors,
              touched,
              handleChange,
              handleSubmit,
              isSubmitting,
            }) => (
              <form onSubmit={handleSubmit} className="form">
                <label>Имя</label>
                <input
                  name="first_name"
                  type="text"
                  placeholder="Введите имя"
                  onChange={handleChange}
                  value={values.first_name}
                  className={`${
                    errors.first_name && touched.first_name && "is-invalid"
                  }`}
                />
                <span>
                  {errors.first_name && touched.first_name && errors.first_name}
                </span>
                <label>Фамилия</label>
                <input
                  name="last_name"
                  type="text"
                  placeholder="Введите фамилию"
                  onChange={handleChange}
                  value={values.last_name}
                  className={`${
                    errors.last_name && touched.last_name && "is-invalid"
                  }`}
                />
                <span>
                  {errors.last_name && touched.last_name && errors.last_name}
                </span>
                <label>E-mail</label>
                <input
                  name="email"
                  type="email"
                  placeholder="Введите логин"
                  autoComplete="none"
                  onChange={handleChange}
                  value={values.email}
                  className={`${errors.email && touched.email && "is-invalid"}`}
                />
                <span>{errors.email && touched.email && errors.email}</span>
                <label>Пароль</label>
                <div className="pass-wrapper">
                  <input
                    name="password"
                    type={passwordShown ? "text" : "password"}
                    placeholder="Введите пароль"
                    onChange={handleChange}
                    value={values.password}
                    className={`${
                      errors.password &&
                      touched.password &&
                      errors.password &&
                      "is-invalid"
                    }`}
                  />
                  <i onClick={() => setPasswordShown(!passwordShown)}>
                    {passwordShown ? <VisibilityOn /> : <VisibilityOff />}
                  </i>
                </div>
                <span>
                  {errors.password && touched.password && errors.password}
                </span>
                <label>Повторите пароль</label>
                <div className="pass-wrapper">
                  <input
                    name="confirm_password"
                    type={confirmPasswordShown ? "text" : "password"}
                    placeholder="Введите пароль"
                    onChange={handleChange}
                    value={values.confirm_password}
                    className={`${
                      errors.confirm_password &&
                      touched.confirm_password &&
                      errors.confirm_password &&
                      "is-invalid"
                    }`}
                  />
                  <i
                    onClick={() =>
                      setConfirmPasswordShown(!confirmPasswordShown)
                    }
                  >
                    {confirmPasswordShown ? (
                      <VisibilityOn />
                    ) : (
                      <VisibilityOff />
                    )}
                  </i>
                </div>
                <span>
                  {errors.confirm_password &&
                    touched.confirm_password &&
                    errors.confirm_password}
                </span>
                <CustomButton
                  type="submit"
                  disabled={isSubmitting}
                  width={200}
                  label={"Зарегистрироваться"}
                />
                <Link to={LOGIN_ROUTE} onClick={() => dispatch(setError(null))}>
                  Вернуться
                </Link>
              </form>
            )}
          </Formik>
        </div>
      </Grid>
    </Container>
  );
};

export default Registration;
