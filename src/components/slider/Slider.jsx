import React, { useEffect, useState } from "react";
import { AiOutlineArrowLeft, AiOutlineArrowRight } from "react-icons/ai";
import "./Slider.scss";
import { sliderData } from "./slider-data";
import { Link } from "react-router-dom";

export const Slider = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const slideLength = sliderData.length;

  useEffect(() => {
    setCurrentSlide(0);
  }, []);

  const nextSlide = () => {
    setCurrentSlide(currentSlide === slideLength - 1 ? 0 : currentSlide + 1);
  };

  const prevSlide = () => {
    setCurrentSlide(currentSlide === 0 ? slideLength - 1 : currentSlide - 1);
  };

  //autoscroll functionality
  const autoscroll = true;
  let slideInterval;
  let intervalTime = 5000;

  const auto = () => {
    slideInterval = setInterval(nextSlide, intervalTime);
  };

  useEffect(() => {
    autoscroll && auto();

    // Before the effect is applied again, clear any previously-set intervals that were started by the setInterval() function
    return () => clearInterval(slideInterval);
  }, [currentSlide, autoscroll, slideInterval]);

  //..

  return (
    <div className="slider">
      <AiOutlineArrowLeft className="arrow prev" onClick={prevSlide} />
      <AiOutlineArrowRight className="arrow next" onClick={nextSlide} />

      {sliderData.map((slide, index) => {
        const { image, heading, desc } = slide;
        return (
          <div
            key={index}
            className={index === currentSlide ? "slide current" : "slide"}
          >
            {index === currentSlide && (
              <>
                <img src={image} alt="slide" />
                <div className="content">
                  <h2>{heading}</h2>
                  <p>{desc}</p>
                  <hr />
                  <button className="--btn --btn-primary">
                    <Link to="/#products"> Shop Now</Link>
                  </button>
                </div>
              </>
            )}
          </div>
        );
      })}
    </div>
  );
};
