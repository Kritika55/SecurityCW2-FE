import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import ProgressSteps from '../../components/StepBar/StepBar';
import Navbar from '../../components/Navbar/Navbar';

const ConfirmationContainer = styled.div`
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

const ConfirmationDetails = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
`;

const Confirmation = () => {
  const location = useLocation();
  const navigate = useNavigate();

  const { pickupLocation, pickupDate, dropOffDate } = location.state;

  return (
    <ConfirmationContainer>
      <Navbar />
      <Divider />
      <Content>
        <ProgressSteps activeStep={3} />
        <GoBackButton onClick={() => navigate(-1)}>&larr; Go back</GoBackButton>
        <ConfirmationDetails>
          <h2>Confirmation</h2>
          <p>Pickup Location: {pickupLocation}</p>
          <p>Pickup Date: {pickupDate}</p>
          <p>Drop Off Date: {dropOffDate}</p>
          <p>Thank you for your reservation!</p>
        </ConfirmationDetails>
      </Content>
    </ConfirmationContainer>
  );
};

export default Confirmation;
