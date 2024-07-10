import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import ProgressSteps from '../../components/StepBar/StepBar';
import Navbar from '../../components/Navbar/Navbar';

const PaymentContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-top: 20px;
`;

const Divider = styled.hr`
  width: 100%;
  border: 0;
  height: 2px;
  background: black;
  margin: 90px 0;
`;

const Content = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 80%;
  padding: 20px;
  background-color: rgb(236, 232, 232);
  border-radius: 8px;
  position: relative;
`;

const GoBackButton = styled.button`
  position: absolute;
  top: 20px;
  left: 20px;
  background: none;
  border: none;
  color: black;
  cursor: pointer;
`;

const PaymentForm = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  max-width: 400px;
`;

const FormGroup = styled.div`
  margin-bottom: 15px;
`;

const FormGroupLabel = styled.label`
  display: block;
  margin-bottom: 5px;
  font-weight: bold;
`;

const FormGroupInput = styled.input`
  width: 100%;
  padding: 8px;
  border: 1px solid #ccc;
  border-radius: 4px;
`;

const ProceedButton = styled.button`
  width: 100%;
  padding: 10px;
  background-color: #28a745;
  color: #fff;
  border: none;
  border-radius: 4px;
  cursor: pointer;
`;

const Payment = () => {
  const location = useLocation();
  const navigate = useNavigate();

  // Destructure location.state with default values if it's null or undefined
  const { pickupLocation = '', pickupDate = '', dropOffDate = '' } = location.state || {};

  const handleProceed = () => {
    navigate('/booknow/confirmation', {
      state: {
        pickupLocation,
        pickupDate,
        dropOffDate,
      },
    });
  };

  return (
    <PaymentContainer>
      <Navbar />
      <Divider />
      <Content>
        <ProgressSteps activeStep={2} />
        <GoBackButton onClick={() => navigate(-1)}>&larr; Go back</GoBackButton>
        <PaymentForm>
          <FormGroup>
            <FormGroupLabel htmlFor="cardNumber">Card Number</FormGroupLabel>
            <FormGroupInput
              type="text"
              id="cardNumber"
              placeholder="Enter your card number"
            />
          </FormGroup>
          <FormGroup>
            <FormGroupLabel htmlFor="expiryDate">Expiry Date</FormGroupLabel>
            <FormGroupInput type="text" id="expiryDate" placeholder="MM/YY" />
          </FormGroup>
          <FormGroup>
            <FormGroupLabel htmlFor="cvv">CVV</FormGroupLabel>
            <FormGroupInput type="text" id="cvv" placeholder="Enter CVV" />
          </FormGroup>
          <FormGroup>
            <FormGroupLabel htmlFor="nameOnCard">Name on Card</FormGroupLabel>
            <FormGroupInput
              type="text"
              id="nameOnCard"
              placeholder="Enter name on card"
            />
          </FormGroup>
          <ProceedButton onClick={handleProceed}>Proceed</ProceedButton>
        </PaymentForm>
      </Content>
    </PaymentContainer>
  );
};

export default Payment;
