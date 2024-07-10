import React from 'react';
import styled from 'styled-components';
import { useLocation } from 'react-router-dom';

const MainContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
`;

const StepContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 80%;
  max-width: 1000px;
  margin: 0 auto;
  position: relative;
  :before {
    content: '';
    position: absolute;
    background: #f3e7f3;
    height: 4px;
    width: 100%;
    top: 50%;
    transform: translateY(-50%);
    left: 0;
  }
  :after {
    content: '';
    position: absolute;
    background: #4a154b;
    height: 4px;
    width: ${({ width }) => width};
    top: 50%;
    transition: width 0.4s ease;
    transform: translateY(-50%);
    left: 0;
  }
`;

const StepWrapper = styled.div`
  position: relative;
  z-index: 1;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const StepStyle = styled.div`
  width: 30px;
  height: 30px;
  border-radius: 50%;
  background-color: #fff;;
  border: 2px solid ${({ step }) => (step === 'completed' ? '#4A154B' : '#F3E7F3')};
  transition: border-color 0.4s ease;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const StepCount = styled.span`
  font-size: 14px;
  color: #4a154b;
`;

const StepsLabelContainer = styled.div`
  margin-top: 4px;
`;

const StepLabel = styled.span`
  font-size: 14px;
  color: #4a154b;
`;

const CheckMark = styled.div`
  font-size: 18px;
  font-weight: 600;
  color: #4a154b;
  -ms-transform: scaleX(-1) rotate(-46deg);
  -webkit-transform: scaleX(-1) rotate(-46deg);
  transform: scaleX(-1) rotate(-46deg);
`;

const steps = [
  {
    label: 'Reservation Summary',
    path: '/booknow',
  },
  {
    label: 'Payment',
    path: '/booknow/payment',
  },
  {
    label: 'Confirmation',
    path: '/booknow/confirmation',
  },
];

const ProgressSteps = ({ activeStep }) => {
  // Calculate the width of the progress bar
  const width = `${((activeStep - 1) / (steps.length - 1)) * 100}%`;

  return (
    <MainContainer>
      <StepContainer width={width}>
        {steps.map(({ label }, index) => (
          <StepWrapper key={label}>
            <StepStyle step={activeStep > index + 1 ? 'completed' : 'incomplete'}>
              {activeStep > index + 1 ? (
                <CheckMark>&#10003;</CheckMark>
              ) : (
                <StepCount>{index + 1}</StepCount>
              )}
            </StepStyle>
            <StepsLabelContainer>
              <StepLabel>{label}</StepLabel>
            </StepsLabelContainer>
          </StepWrapper>
        ))}
      </StepContainer>
    </MainContainer>
  );
};

export default ProgressSteps;
