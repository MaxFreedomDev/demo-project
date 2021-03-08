import React, { useEffect } from "react";
import "./product.scss";
import { Link } from "react-router-dom";
import { MAIN_ROUTE } from "../../../utils/const";
import { useDispatch, useSelector } from "react-redux";
import { getProduct } from "../../../actions/products";
import noImage from "../../../icon/no-image.png";
import CustomButton from "../../controls/custom-button";
import LoadableImage from "../../loadable-image/loadable-image";

const Product = (props) => {
  const dispatch = useDispatch();
  const item = useSelector((state) => state.products.item);
  const id = props.match.params.id;

  useEffect(() => {
    document.title = `Продукт №${id}`;
    dispatch(getProduct(id));
  }, [dispatch, id]);

  return (
    <div className="contentWrapper">
      <div className="headerProduct">
        <Link to={MAIN_ROUTE}>Вернуться</Link>
      </div>
      <div className="aboutProduct">
        <LoadableImage src={item.picture || noImage} alt={""} />
        <div className="descriptionProduct">
          <h3>{item.name}</h3>
          <p>{item.description || "Описание отсутсвует"}</p>
        </div>
      </div>
      <div className="optionsProduct">
        <div className="optionsProductItem">
          {item.properties &&
            item.properties.length > 0 &&
            item.properties.map((i) => (
              <div key={i.property} className="optionsProductItem">
                <label>{i.property}</label>
                {Array.isArray(i.value) ? (
                  <select
                    name={i.property}
                    className="arrowSelect productViewSelect"
                  >
                    {i.value.map((el, index) => (
                      <option key={index} value={el}>
                        {el}
                      </option>
                    ))}
                  </select>
                ) : (
                  <span>{i.value}</span>
                )}
              </div>
            ))}
          <label>Стоимость</label>
          <span className="optionsProductItemPrice">{item.price}$</span>
        </div>
        <div className="optionsProductActions">
          <CustomButton label="Беру!!!!" />
        </div>
      </div>
    </div>
  );
};

export default Product;
