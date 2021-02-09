import React, { useState } from "react";
import { ReactComponent as Download } from "../../icon/download.svg";
import "./index.scss";
import NumberFormat from "react-number-format";

const CustomInput = (props) => {
  const {
    name,
    type,
    onChange,
    placeholder,
    sup,
    value,
    fileHandler,
    textarea,
    nameInput,
    onChangeForm,
    fileName,
    setFieldValue,
    price,
  } = props;
  const [file, setFile] = useState("");

  const setFileValue = (event) => {
    setFile(event.target.files[0]?.name);
    fileHandler(event);
    setFieldValue(nameInput, event.target.files[0]);
  };

  if (price) {
    return (
      <>
        <span className="label">
          {name}
          {sup && <sup>*</sup>}
        </span>
        <NumberFormat
          onChange={
            !onChangeForm ? (e) => onChange(e.target.value) : onChangeForm
          }
          value={value}
          name={nameInput}
          className="input"
          thousandSeparator=" "
          type="text"
        />
      </>
    );
  }

  if (textarea) {
    return (
      <>
        <span className="label">
          {name}
          {sup && <sup>*</sup>}
        </span>
        <textarea
          cols={5}
          onChange={
            !onChangeForm ? (e) => onChange(e.target.value) : onChangeForm
          }
          value={value}
          name={nameInput}
        />
      </>
    );
  }

  return (
    <>
      {name && (
        <span className="label">
          {name}
          {sup && <sup>*</sup>}
        </span>
      )}
      {type === "file" ? (
        <div className="containerInputFile">
          <label htmlFor="file-upload" className="custom-file-upload">
            <Download />
          </label>
          <input
            id="file-upload"
            name={nameInput}
            type={type}
            style={{ display: "none" }}
            onChange={setFileValue}
          />
          <input
            id="uploadFile"
            disabled="disabled"
            defaultValue={file || fileName}
          />
        </div>
      ) : (
        <input
          type={type}
          value={value}
          onChange={
            !onChangeForm ? (e) => onChange(e.target.value) : onChangeForm
          }
          placeholder={placeholder}
          className="input"
          name={nameInput}
        />
      )}
    </>
  );
};

export default CustomInput;
