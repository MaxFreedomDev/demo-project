import React from "react";
import CustomButton from "../../controls/custom-button";
import { withRouter } from "react-router-dom";

const HeaderCreate = ({
  link,
  onClick,
  item,
  history,
  page,
  title,
  type,
  disabled,
}) => {
  return (
    <>
      <div className="createItemActions">
        <CustomButton
          onClick={(e) => {
            history.push(
              !page
                ? link
                : {
                    pathname: link,
                    state: { page },
                  }
            );

            e.preventDefault();
          }}
          label={"Вернуться"}
        />
        <CustomButton
          onClick={onClick}
          label={item ? "Изменить" : "Сохранить"}
          type={type}
          disabled={disabled}
        />
      </div>
      <div className="createItemTitle">
        <h3>{title}</h3>
      </div>
    </>
  );
};

export default withRouter(HeaderCreate);
