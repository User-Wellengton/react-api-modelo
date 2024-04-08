import React from "react";
import Slider from "react-slick";
import Sofa from "../../../assets/Sofa.jpg";
import Mesa from "../../../assets/Mesa Com Cadeira.jpg";
import Quarto from "../../../assets/Quarto.jpg";
import Cozinha from "../../../assets/Cozinha.jpg";

function Fade() {
  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
  };

  const slideStyle: React.CSSProperties = {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  };

  const imgContainerStyle: React.CSSProperties = {
    textAlign: "center",
    width: "100%",
  };

  const imgStyle: React.CSSProperties = {
    display: "block",
    margin: "auto",
    maxHeight: "400px",
  };

  return (
    <div className="slider-container">
      <Slider {...settings}>
        <div style={slideStyle}>
          <div style={imgContainerStyle}>
            <img src={Sofa} style={imgStyle} alt="Sofa" />
          </div>
        </div>
        <div style={slideStyle}>
          <div style={imgContainerStyle}>
            <img src={Mesa} style={imgStyle} alt="Mesa" />
          </div>
        </div>
        <div style={slideStyle}>
          <div style={imgContainerStyle}>
            <img src={Quarto} style={imgStyle} alt="Quarto" />
          </div>
        </div>
        <div style={slideStyle}>
          <div style={imgContainerStyle}>
            <img src={Cozinha} style={imgStyle} alt="Cozinha" />
          </div>
        </div>
      </Slider>
    </div>
  );
}

export default Fade;
