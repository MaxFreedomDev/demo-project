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
  const car = useSelector((state) => state.products.car);
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
        <LoadableImage src={car.picture || noImage} alt={""} />
        <div className="descriptionProduct">
          <h3>{car.name}</h3>
          <p>{car.description || "Описание отсутсвует"}</p>
        </div>
      </div>
      <div className="optionsProduct">
        <div className="optionsProductItem">
          {car.properties &&
            car.properties.length > 0 &&
            car.properties.map((item) => (
              <div key={item.property} className="optionsProductItem">
                <label>{item.property}</label>
                {Array.isArray(item.value) ? (
                  <select
                    name={item.property}
                    className="arrowSelect productViewSelect"
                  >
                    {item.value.map((el, index) => (
                      <option key={index} value={el}>
                        {el}
                      </option>
                    ))}
                  </select>
                ) : (
                  <span>{item.value}</span>
                )}
              </div>
            ))}
          <label>Стоимость</label>
          <span className="optionsProductItemPrice">{car.price}$</span>
        </div>
        <div className="optionsProductActions">
          <CustomButton label="Беру!!!!" />
        </div>
      </div>
    </div>
  );
};

export default Product;
