import React, { useEffect, useState } from "react";
import "./login.scss";
import Container from "@material-ui/core/Container";
import Grid from "@material-ui/core/Grid";
import { Link } from "react-router-dom";
import VisibilityOn from "@material-ui/icons/VisibilityOutlined";
import VisibilityOff from "@material-ui/icons/VisibilityOffOutlined";
import { Formik } from "formik";
import { REGISTRATION_ROUTE } from "../../utils/const";
import { useDispatch, useSelector } from "react-redux";
import { logIn, setError } from "../../actions/auth";
import CustomButton from "../controls/custom-button";
import Tooltip from "@material-ui/core/Tooltip";

const Login = () => {
  const [passwordShown, setPasswordShown] = useState(false);
  const errorServer = useSelector((state) => state.auth.error);
  const dispatch = useDispatch();
  useEffect(() => {
    document.title = "Добро пожаловать";
  }, []);

  return (
    <Container>
      <Grid
        container
        style={{ height: window.innerHeight - 50 }}
        alignItems={"center"}
        justify={"center"}
      >
        <Tooltip
          title={"Login: admin@demo.com Password: admin01"}
          enterDelay={500}
          leaveDelay={200}
        >
          <div className="formWrapper">
            <h2>Вход</h2>
            {errorServer && <div className="error">{errorServer}</div>}
            <Formik
              initialValues={{ email: "", password: "" }}
              validate={(values) => {
                const errors = {};
                if (!values.email) {
                  errors.email = "Поле не должно быть пустым";
                } else if (
                  !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(values.email)
                ) {
                  errors.email = "Неверный формат email";
                }
                if (!values.password) {
                  errors.password = "Поле не должно быть пустым";
                }
                return errors;
              }}
              onSubmit={(values, { setSubmitting }) => {
                setSubmitting(false);
                const { email, password } = values;
                dispatch(logIn(email, password));
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
                  <label>Логин</label>
                  <input
                    name="email"
                    type="email"
                    placeholder="Введите логин"
                    onChange={handleChange}
                    value={values.email}
                    className={`${
                      errors.email && touched.email && "is-invalid"
                    }`}
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
                  <CustomButton
                    type="submit"
                    disabled={isSubmitting}
                    label={isSubmitting ? "Ожидание..." : "Войти"}
                  />
                  <Link
                    to={REGISTRATION_ROUTE}
                    onClick={() => dispatch(setError(null))}
                  >
                    Зарегистрироваться
                  </Link>
                </form>
              )}
            </Formik>
          </div>
        </Tooltip>
      </Grid>
    </Container>
  );
};

export default Login;
