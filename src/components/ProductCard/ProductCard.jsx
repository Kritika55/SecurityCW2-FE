import React from 'react';
import { useNavigate } from 'react-router-dom';
import '../../CSS/ProductCard.css';

const ProductCard = ({ productInformation, color }) => {
  const navigate = useNavigate();

  const handleRentNow = () => {
    navigate(`/booknow/${productInformation._id}`);
  };

  return (
    <div className="card" style={{ width: '18rem' }}>
      <span
        style={{ backgroundColor: color }}
        className="badge position-absolute top-0"
      >
        {productInformation.productCategory}
      </span>
      <img
        src={`http://localhost:5000/products/${productInformation.productImage}`}
        className="card-img-top"
        alt={productInformation.productName}
      />
      <div className="card-body">
        <h5 className="card-title">{productInformation.productName}</h5>
        <div className="card-text">
          <div className="product-info">
            <span className="label">Engine:</span>
            <span className="data">{productInformation.productEngine} cc</span>
          </div>
          <div className="product-info">
            <span className="label">Mileage:</span>
            <span className="data">{productInformation.productMileage} kmpl</span>
          </div>
          <div className="product-info">
            <span className="label">Rate: Rs.</span>
            <span className="data">{productInformation.productPrice} /day</span>
          </div>
          <div className="product-info">
            <span className="label">Occupancy:</span>
            <span className="data">{productInformation.productOccupancy} people</span>
          </div>
        </div>
        <div className="d-flex justify-content-between">
          <button className="btn btn-outline-secondary rounded">View Details</button>
          <button onClick={handleRentNow} className="btn btn-outline-dark rounded">Rent Now</button>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
