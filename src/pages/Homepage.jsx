import React, { useEffect } from 'react';
import { testApi } from '../api/Api';
import Slider from 'react-slick';
import '../CSS/Homepage.css';
import SliderImage1 from '../components/Assets/images/Slider.jpg';
import SliderImage2 from '../components/Assets/images/Slider-1.jpg';
import "slick-carousel/slick/slick.css"; 
import "slick-carousel/slick/slick-theme.css";

const Homepage = () => {
  useEffect(() => {
    testApi()
      .then((res) => {
        console.log(res.data);
      })
      .catch((error) => {
        console.error('Error fetching data:', error);
      });
  }, []);

  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 3000,
    arrows: false,
  };

  return (
    <div>
      <div className="homepage-container">
        <Slider {...settings} className="full-page-slider">
          <div className="slide">
            <img src={SliderImage1} alt="Slider 1" className="full-page-image" />
            <div className="overlay">
              <h1>Your <span className="highlight">Journey</span><br />Our Wheels!</h1>
            </div>
          </div>
          <div className="slide">
            <img src={SliderImage2} alt="Slider 2" className="full-page-image" />
            <div className="overlay">
              <h1><span className="highlight">Adventure </span>is just<br /> a Rental Away!</h1>
            </div>
          </div>
        </Slider>
      </div>
      <div className="content-below">
        <p>This is some content below the slider.</p>
      </div>
    </div>
  );
};

export default Homepage;
