import React, { useEffect } from "react";
import { useSelector } from "react-redux";
import AddIcon from "@material-ui/icons/AddCircleOutline";
import RemoveIcon from "@material-ui/icons/RemoveCircleOutline";
import { makeStyles } from "@material-ui/core/styles";
import Box from "@material-ui/core/Box";
import { Field, FieldArray, useFormikContext } from "formik";

const useStyles = makeStyles((theme) => ({
  header: {
    display: "flex",
    alignItems: "center",
    backgroundColor: "#FEFEFE",
    borderTop: "1px solid #F7F9FA",
    borderBottom: "1px solid #F7F9FA",
    padding: "12px 0",
    marginBottom: 12,
  },
  propContainer: {
    display: "flex",
    marginBottom: 20,
    borderBottom: "1px solid #F7F9FA",
  },
  propItems: {
    display: "flex",
    margin: "8px 0 0 30px",
    [theme.breakpoints.down("md")]: {
      flexDirection: "column",
      margin: "8px 0 0 10px",
    },
  },
  icon: {
    marginLeft: 36,
    cursor: "pointer",
  },
  label: {
    fontSize: 14,
    marginBottom: 8,
    [theme.breakpoints.down("md")]: {
      marginTop: "8px",
    },
  },
}));

const DropDown = ({ values, remove, push, personIndex, name }) => {
  const { setFieldValue } = useFormikContext();
  useEffect(() => {
    if (!Array.isArray(values)) {
      setFieldValue(name, []);
    }
  }, [values, setFieldValue, name]);

  return (
    <>
      {Array.isArray(values) &&
        values.map((value, index) => (
          <Box display={"flex"} key={index}>
            <Field
              name={`properties.${personIndex}.value.${index}`}
              validate={(value) => value?.length === 0 && "Заполните поле"}
            >
              {({ field, meta }) => (
                <div>
                  <input
                    type="text"
                    className={
                      meta.touched && meta.error ? "input error" : "input"
                    }
                    style={{ marginBottom: 5 }}
                    value={field.value}
                    onChange={field.onChange}
                    onBlur={field.onBlur}
                    {...field}
                  />
                  {meta.touched && meta.error && (
                    <div className="textError">{meta.error}</div>
                  )}
                </div>
              )}
            </Field>
            <RemoveIcon
              fontSize={"small"}
              color={"secondary"}
              style={{ cursor: "pointer", marginLeft: 30 }}
              onClick={() => remove(index)}
            />
          </Box>
        ))}
      <AddIcon
        fontSize={"small"}
        color={"secondary"}
        style={{ cursor: "pointer" }}
        onClick={() => push("")}
      />
    </>
  );
};

const AddPropertyForProduct = ({ values }) => {
  const classes = useStyles();
  const properties = useSelector((state) => state.property.properties);
  const newValues = values.map((item) => `${item.property}`);

  return (
    <FieldArray
      name="properties"
      render={({ remove, push }) => (
        <div>
          <div className={classes.header}>
            <h3 style={{ fontSize: "14px" }}>Добавление товару свойств</h3>
            <AddIcon
              fontSize={"small"}
              color={"secondary"}
              className={classes.icon}
              onClick={() => push({ property: "", value: [] })}
            />
          </div>
          {newValues.length > 0 &&
            newValues.map((property, index) => (
              <div className={classes.propContainer} key={index}>
                <RemoveIcon
                  fontSize={"small"}
                  color={"secondary"}
                  style={{ cursor: "pointer" }}
                  onClick={() => remove(index)}
                />
                <div className={classes.propItems}>
                  <Box display={"flex"} flexDirection={"column"}>
                    <span className={classes.label}>{`Свойство ${
                      index + 1
                    }`}</span>
                    <Field
                      name={`properties.${index}.property`}
                      validate={(value) => !value && "Выберите свойство"}
                    >
                      {({ field, meta }) => (
                        <div>
                          <select
                            className={
                              meta.touched && meta.error
                                ? "arrowSelect error"
                                : "arrowSelect"
                            }
                            value={field.property}
                            onBlur={field.onBlur}
                            {...field}
                          >
                            <option value="" disabled>
                              Выбрать
                            </option>
                            {properties.map((x) => (
                              <option
                                key={x.name}
                                value={x.name}
                                label={x.name}
                                disabled={
                                  newValues.includes(x.name) &&
                                  newValues[index] !== x
                                }
                              />
                            ))}
                          </select>
                          {meta.touched && meta.error && (
                            <div className="textError">{meta.error}</div>
                          )}
                        </div>
                      )}
                    </Field>
                  </Box>
                  <Box display={"flex"} flexDirection={"column"}>
                    <span className={classes.label}>Значение</span>
                    {properties.find(
                      (el) => el?.name === values[index].property
                    )?.type === "Dropdown" ? (
                      <FieldArray
                        name={`properties.${index}.value`}
                        render={({ remove, push }) => (
                          <DropDown
                            values={values[index].value}
                            personIndex={index}
                            push={push}
                            remove={remove}
                            name={`properties.${index}.value`}
                          />
                        )}
                      />
                    ) : (
                      <Field
                        name={`properties.${index}.value`}
                        validate={(value) =>
                          (value?.length === 0 || !value) && "Заполните поле"
                        }
                      >
                        {({ field, meta }) => (
                          <div>
                            <input
                              type={
                                properties.find(
                                  (el) => el?.name === values[index].property
                                )?.type === "Number"
                                  ? "number"
                                  : "text"
                              }
                              className={
                                meta.touched && meta.error
                                  ? "input error"
                                  : "input"
                              }
                              style={{ marginBottom: 5 }}
                              value={field.value}
                              onChange={field.onChange}
                              onBlur={field.onBlur}
                              {...field}
                            />
                            {meta.touched && meta.error && (
                              <div className="textError">{meta.error}</div>
                            )}
                          </div>
                        )}
                      </Field>
                    )}
                  </Box>
                </div>
              </div>
            ))}
        </div>
      )}
    />
  );
};

export default AddPropertyForProduct;
