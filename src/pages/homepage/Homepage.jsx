import React, { useEffect, useState } from 'react';
import { getAllProducts, testApi } from '../../apis/Api';
import ProductCard from '../../components/ProductCard/ProductCard';
import Slider from 'react-slick';
import Navbar from '../../components/Navbar/Navbar';
import Footer from '../../components/Footer/Footer';
import '../../CSS/Homepage.css';
import SliderImage1 from '../../components/Assets/images/Slider.jpg';
import SliderImage2 from '../../components/Assets/images/Slider-1.jpg';
import Keysimage from '../../components/Assets/images/Car-finance.jpg';
import "slick-carousel/slick/slick.css"; 
import "slick-carousel/slick/slick-theme.css";
import BookingCard from '../../components/BookingCard/Bookingcard';

const Homepage = () => {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    getAllProducts().then((res) => {
      setProducts(res.data.products);
    }).catch((error) => {
      console.log(error);
    });
  }, []);

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
    <>
      <Navbar />
      <div className="homepage-container">
        <BookingCard />
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

      <div className='container products-container'>
        <h2 style={{ fontSize: '36px', fontWeight: 'bold' }}>Vehicles at Wheels On Lease</h2>
        <div className="row row-cols-1 row-cols-md-4 g-4">
          {products.map((singleProduct) => (
            <div className="col" key={singleProduct._id}>
              <ProductCard productInformation={singleProduct} color={'green'} />
            </div>
          ))}
        </div>
      </div>

      <div className="why-us-container">
        <div className="text-container">
          <h2>Why Us?</h2>
          <p>Leasing with Wheels on Lease means accessing a diverse range of vehicles
             without the long-term commitment and significant upfront costs of ownership.</p> 
          <p>Whether you need a car, truck, van, or SUV, our extensive selection ensures
             you’ll find the perfect vehicle to suit your needs. We offer flexible lease
              terms and competitive rates, making it easier than ever to drive the latest
               models.</p>
          <button className="read-more-btn">Read more about us</button>
        </div>
        <div className="image-container">
          <img src={Keysimage} alt="Leasing" />
        </div>
      </div>

      <Footer />
    </>
  );
}

export default Homepage;
