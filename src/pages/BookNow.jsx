// import React, { useState } from 'react';
// import { useLocation, useNavigate } from 'react-router-dom';
// import styled from 'styled-components';
// import Navbar from '../components/Navbar/Navbar';
// import ProgressSteps from '../components/StepBar/StepBar';
// import ReservationSummary from './ReservationSummary';
// import Payment from './Payment';

// const BookNowContainer = styled.div`
//   display: flex;
//   flex-direction: column;
//   align-items: center;
//   margin-top: 20px;
// `;

// const Divider = styled.hr`
//   width: 100%;
//   border: 0;
//   height: 2px;
//   background: black;
//   margin: 90px 0;
// `;

// const Content = styled.div`
//   display: flex;
//   flex-direction: column;
//   align-items: center;
//   width: 80%;
//   padding: 20px;
//   background-color: rgb(236, 232, 232);
//   border-radius: 8px;
//   position: relative;
// `;

// const GoBackButton = styled.button`
//   position: absolute;
//   top: 20px;
//   left: 20px;
//   background: none;
//   border: none;
//   color: black;
//   cursor: pointer;
// `;

// const BookNow = () => {
//   const location = useLocation();
//   const navigate = useNavigate();
//   const productInformation = location.state?.productInformation;

//   const [pickupLocation, setPickupLocation] = useState('');
//   const [pickupDate, setPickupDate] = useState('');
//   const [dropOffDate, setDropOffDate] = useState('');
//   const [activeStep, setActiveStep] = useState(1);

//   const handleNext = () => {
//     setActiveStep(activeStep + 1);
//   };

//   const handlePrevious = () => {
//     setActiveStep(activeStep - 1);
//   };

//   const handleReset = () => {
//     setActiveStep(1);
//     setPickupLocation('');
//     setPickupDate('');
//     setDropOffDate('');
//   };

//   const handleProceedToPayment = () => {
//     if (pickupLocation && pickupDate && dropOffDate) {
//       setActiveStep(2);
//     }
//   };

//   const handleProceedToConfirmation = () => {
//     if (pickupLocation && pickupDate && dropOffDate) {
//       setActiveStep(3);
//     }
//   };

//   return (
//     <BookNowContainer>
//       <Navbar />
//       <Divider />
//       <Content>
//         <ProgressSteps activeStep={activeStep} />
//         <GoBackButton onClick={() => navigate(-1)}>&larr; Go back</GoBackButton>
//         {activeStep === 1 && (
//           <ReservationSummary
//             productInformation={productInformation}
//             pickupLocation={pickupLocation}
//             setPickupLocation={setPickupLocation}
//             pickupDate={pickupDate}
//             setPickupDate={setPickupDate}
//             dropOffDate={dropOffDate}
//             setDropOffDate={setDropOffDate}
//             onNext={handleProceedToPayment}
//           />
//         )}
//         {activeStep === 2 && (
//           <Payment
//             pickupLocation={pickupLocation}
//             pickupDate={pickupDate}
//             dropOffDate={dropOffDate}
//             onNext={handleProceedToConfirmation}
//             onPrevious={handlePrevious}
//           />
//         )}
//         {activeStep === 3 && (
//           <Confirmation
//             pickupLocation={pickupLocation}
//             pickupDate={pickupDate}
//             dropOffDate={dropOffDate}
//             onReset={handleReset}
//           />
//         )}
//       </Content>
//     </BookNowContainer>
//   );
// };

// export default BookNow;
