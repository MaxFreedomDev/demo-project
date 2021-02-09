import React, { useEffect } from "react";
import HeaderCreate from "../header-create";
import { MAIN_ROUTE } from "../../../../utils/const";
import { withRouter } from "react-router-dom";
import CustomInput from "../../../controls/custom-input";
import { makeStyles } from "@material-ui/core/styles";
import Radio from "@material-ui/core/Radio";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import RadioGroup from "@material-ui/core/RadioGroup";
import FormControl from "@material-ui/core/FormControl";
import { Formik } from "formik";
import { useDispatch, useSelector } from "react-redux";
import { createProperty } from "../../../../actions/property";
import clsx from "clsx";
import Success from "../../../modal/success";

const useStyles = makeStyles(() => ({
  content: {
    display: "flex",
    flexDirection: "column",
    borderBottom: "1px solid #F7F9FA",
    paddingBottom: 15,
  },
  root: {
    "&:hover": {
      backgroundColor: "transparent",
    },
  },
  icon: {
    borderRadius: "50%",
    width: 24,
    height: 24,
    border: "1px solid #E0E0E0",
    backgroundColor: "#FFFFFF",
    "$root.Mui-focusVisible &": {
      outline: "2px auto rgba(19,124,189,.6)",
      outlineOffset: 2,
    },
  },
  checkedIcon: {
    "&:before": {
      display: "block",
      borderRadius: "50%",
      border: "1px solid #0258FF",
      margin: "3px auto",
      width: 16,
      height: 16,
      content: '""',
    },
  },
}));

function StyledRadio(props) {
  const classes = useStyles();

  return (
    <Radio
      className={classes.root}
      disableRipple
      color="default"
      checkedIcon={<span className={clsx(classes.icon, classes.checkedIcon)} />}
      icon={<span className={classes.icon} />}
      {...props}
    />
  );
}

const CreateProperty = (props) => {
  const classes = useStyles();
  const dispatch = useDispatch();
  const properties = useSelector((state) => state.property.properties);
  const openDialogEvent = useSelector(
    (state) => state.products.openDialogEvent
  );
  const { page } = props.location.state;

  useEffect(() => {
    document.title = "Добавление свойств";
  }, []);

  const addProperty = (values) => {
    dispatch(
      createProperty({
        ...values,
        id:
          properties.length > 0 ? properties[properties.length - 1].id + 1 : 0,
      })
    );
  };

  return (
    <div className="contentWrapper">
      <Formik
        initialValues={{
          name: "",
          type: "Dropdown",
        }}
        validate={(values) => {
          const errors = {};
          if (!values.name) {
            errors.name = "Поле не должно быть пустым";
          } else if (properties.find((el) => el?.name === values.name)) {
            errors.name = "Такое имя уже существует";
          }
          return errors;
        }}
        onSubmit={(values, { setSubmitting, resetForm }) => {
          setSubmitting(false);
          addProperty(values);
          resetForm();
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
          <>
            <form onSubmit={handleSubmit}>
              <HeaderCreate
                link={MAIN_ROUTE}
                page={page}
                title="Добавление свойства"
                type="submit"
                disabled={isSubmitting}
              />
              <div className={classes.content}>
                <CustomInput
                  name="Название свойства"
                  nameInput="name"
                  sup
                  value={values.name}
                  onChangeForm={handleChange}
                />
                <span className="textError">
                  {errors.name && touched.name && errors.name}
                </span>
                <FormControl component="fieldset">
                  <span className="label">
                    Укажите тип свойства
                    <sup>*</sup>
                  </span>
                  <RadioGroup
                    aria-label="gender"
                    name="type"
                    value={values.type}
                    onChange={handleChange}
                  >
                    <FormControlLabel
                      value="Dropdown"
                      control={<StyledRadio />}
                      label="Dropdown"
                    />
                    <FormControlLabel
                      value="Number"
                      control={<StyledRadio />}
                      label="Number"
                    />
                    <FormControlLabel
                      value="String"
                      control={<StyledRadio />}
                      label="String"
                    />
                  </RadioGroup>
                </FormControl>
              </div>
            </form>
          </>
        )}
      </Formik>
      {openDialogEvent && (
        <Success label="Свойство добавлено" open={openDialogEvent} />
      )}
    </div>
  );
};

export default withRouter(CreateProperty);
