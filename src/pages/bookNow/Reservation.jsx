import React, { useState, useEffect, useContext } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import styled from 'styled-components';
import ProgressSteps from '../../components/StepBar/StepBar';
import Navbar from '../../components/Navbar/Navbar';
import { FiChevronDown } from 'react-icons/fi'; // Import dropdown icon from react-icons
import { UserContext } from '../../UserContext';
import { createBookingApi } from '../../apis/Api';
import { toast } from 'react-toastify';


// Utility function to format date
const formatDate = (dateString) => {
  const options = { year: 'numeric', month: 'short', day: 'numeric' };
  return new Date(dateString).toLocaleDateString(undefined, options);
};

const BookNowContainer = styled.div`
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

const MainContent = styled.div`
  display: flex;
  justify-content: space-between;
  width: 100%;
  margin-top: 20px;
`;

const ImageInputBox = styled.div`
  display: flex;
  flex: 2;
  justify-content: space-between;
  align-items: center; /* Align items vertically */
  background: white;
  padding: 20px;
  border-radius: 8px;
  margin-right: 20px;
  position: relative;
`;

const Images = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  margin-right: 20px;
`;

const MainImage = styled.img`
  width: 100%;
  height: auto;
  border-radius: 8px;
`;

const ThumbnailContainer = styled.div`
  display: flex;
  justify-content: space-between;
  margin-top: 10px;
`;

const Thumbnail = styled.img`
  width: 48%;
  height: auto;
  border-radius: 8px;
`;

const Form = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  width: 100%;
`;

const FormGroup = styled.div`
  margin-bottom: 15px;
  position: relative;
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
  position: relative;
`;

const DropdownIcon = styled.div`
  position: absolute;
  top: 50%; /* Center vertically */
  right: 10px;
  transform: translateY(-50%);
  cursor: pointer;
`;

const DropdownContainer = styled.div`
  position: absolute;
  top: calc(100% + 5px); /* Position below the input field */
  left: 0;
  width: 100%;
  max-height: 150px; /* Limit height if needed */
  overflow-y: auto; /* Enable scrolling */
  background-color: white;
  border: 1px solid #ccc;
  border-radius: 4px;
  z-index: 10; /* Ensure dropdown appears above other content */
`;

const DropdownItem = styled.div`
  padding: 8px;
  cursor: pointer;

  &:hover {
    background-color: #f2f2f2;
  }
`;

const SummaryBox = styled.div`
  width: 323px;
  height: 457px;
  display: flex;
  flex-direction: column;
  background: white;
  padding: 20px;
  border-radius: 20px;
`;

const SummaryHeader = styled.h2`
  text-align: center;
  font-weight: bold;
  margin-bottom: 20px;
`;

const SummaryDetails = styled.div`
  width: 297px;
  height: 237px; /* Increased height to accommodate both locations */
  border: 1px solid black;
  border-radius: 16px;
  padding: 10px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
`;

const DatesContainer = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const DateLabel = styled.span`
  margin-bottom: 5px; /* Added margin to separate label from value */
`;

const DateValue = styled.span`
  font-weight: bold;
  font-size: 14px;
`;

const DateSeparator = styled.div`
  height: 1px;
  width: 100%;
  background-color: black;
  margin: 5px 0;
`;

const PriceSummary = styled.h3`
  margin: 20px 0 10px;
`;

const SummaryItem = styled.div`
  display: flex;
  justify-content: space-between;
  margin-bottom: 10px;
`;

const SummaryTotal = styled.div`
  display: flex;
  justify-content: space-between;
  font-weight: bold;
  margin-top: 20px;
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

const locations = [
  'Thamel',  'Boudha',  'Patan',  'Durbar Marg',  'Lazimpat',  'New Road',  'Ason',
  'Balaju',
  'Baneshwor',
  'Koteshwor',
  'Jorpati',
  'Maharajgunj',
  'Kalanki',
  'Sundhara',
  'Naxal',
  'Jawalakhel',
  'Sanepa',
  'Pulchowk',
  'Kupondole',
  'Satdobato',
  'Balkot',
  'Gaththaghar',
  'Suryabinayak',
  'Kamalbinayak',
  'Balkumari',
  'Lokanthali',
  'Gongabu',
  'Samakhushi',
  'Dhapasi',
  'Basantapur',
  'Bhaktapur - Durbar Square',
  'Bhaktapur - Dattatreya Square',
  'Lalitpur - Patan Durbar Square',
  'Lalitpur - Bungamati'
  // Add more specific locations as needed
];

const ReservationSummary = () => {  
  const { user } = useContext(UserContext);
  const {productId} = useParams();
  const navigate = useNavigate();
  const [pickupDate, setPickupDate] = useState('');
  const [dropOffDate, setDropOffDate] = useState('');
  const [pickupLocation, setPickupLocation] = useState('');
  const [dropOffLocation, setDropOffLocation] = useState('');
  const [pickupSearchTerm, setPickupSearchTerm] = useState('');
  const [dropOffSearchTerm, setDropOffSearchTerm] = useState('');
  const [showPickupDropdown, setShowPickupDropdown] = useState(false);
  const [showDropOffDropdown, setShowDropOffDropdown] = useState(false);
  const [totalPrice, setTotalPrice] = useState(0);

  const dailyRent = 20000;
  const taxRate = 0.13;


  const handleSubmit = async () => {
    const formData = {
      pickupDate,
      dropOffDate,
      pickupLocation,
      dropOffLocation,
      totalPrice,
      userId: user ? user._id : null, 
      productId

    };
  
    try {
      const response = await createBookingApi(formData);
      console.log(response.data.success);

      if (response.data.success) {
        toast.success('Reservation submitted successfully!');
        navigate('/booknow/payment'); // Redirect to success page
      } else {
        console.error('Error submitting reservation:', response.statusText);
        toast.error('Failed to submit reservation. Please try again.');
      }
    } catch (error) {
      console.error('Error submitting reservation:', error);
      toast.error('Failed to submit reservation. Please try again.');
    }
  };
  

  const handlePickupLocationChange = (e) => {
    const value = e.target.value;
    setPickupLocation(value);
    setPickupSearchTerm(value);
    setShowPickupDropdown(true);
  };

  const handleDropOffLocationChange = (e) => {
    const value = e.target.value;
    setDropOffLocation(value);
    setDropOffSearchTerm(value);
    setShowDropOffDropdown(true);
  };

  const handlePickupDropdownSelect = (location) => {
    setPickupLocation(location);
    setPickupSearchTerm(location);
    setShowPickupDropdown(false);
  };

  const handleDropOffDropdownSelect = (location) => {
    setDropOffLocation(location);
    setDropOffSearchTerm(location);
    setShowDropOffDropdown(false);
  };

  const handleProceed = () => {
    if (pickupLocation && dropOffLocation && pickupDate && dropOffDate) {
      navigate('/booknow/payment', {
        state: {
          pickupLocation,
          dropOffLocation,
          pickupDate,
          dropOffDate,
          totalPrice,
        },
      });
    }
  };

  const handleBlur = () => {
    setTimeout(() => {
      setShowPickupDropdown(false);
      setShowDropOffDropdown(false);
    }, 100);
  };

  const today = new Date().toISOString().split('T')[0];

  

  return (
    <BookNowContainer>
      <Navbar />
      <Divider />
      <Content>
        <ProgressSteps activeStep={1} />
        <GoBackButton onClick={() => navigate(-1)}>&larr; Go back</GoBackButton>
        <MainContent>
          <ImageInputBox>
            <Images>
              <MainImage src="https://via.placeholder.com/600x400" alt="Main Car" />
              <ThumbnailContainer>
                <Thumbnail src="https://via.placeholder.com/150" alt="Thumbnail 1" />
                <Thumbnail src="https://via.placeholder.com/150" alt="Thumbnail 2" />
              </ThumbnailContainer>
            </Images>
            <Form>
              <FormGroup>
                <FormGroupLabel htmlFor="pickupLocation">Pickup Location</FormGroupLabel>
                <FormGroupInput
                  id="pickupLocation"
                  type="text"
                  placeholder="Select or type location"
                  value={pickupLocation}
                  onChange={handlePickupLocationChange}
                  onFocus={() => setShowPickupDropdown(true)}
                  onBlur={handleBlur}
                />
                <DropdownIcon onClick={() => setShowPickupDropdown(!showPickupDropdown)}>
                  <FiChevronDown />
                </DropdownIcon>
                {showPickupDropdown && (
                  <DropdownContainer>
                    {locations
                      .filter((location) => location.toLowerCase().includes(pickupSearchTerm.toLowerCase()))
                      .map((location) => (
                        <DropdownItem key={location} onMouseDown={() => handlePickupDropdownSelect(location)}>
                          {location}
                        </DropdownItem>
                      ))}
                  </DropdownContainer>
                )}
              </FormGroup>
              <FormGroup>
                <FormGroupLabel htmlFor="dropOffLocation">Drop-off Location</FormGroupLabel>
                <FormGroupInput
                  id="dropOffLocation"
                  type="text"
                  placeholder="Select or type location"
                  value={dropOffLocation}
                  onChange={handleDropOffLocationChange}
                  onFocus={() => setShowDropOffDropdown(true)}
                  onBlur={handleBlur}
                />
                <DropdownIcon onClick={() => setShowDropOffDropdown(!showDropOffDropdown)}>
                  <FiChevronDown />
                </DropdownIcon>
                {showDropOffDropdown && (
                  <DropdownContainer>
                    {locations
                      .filter((location) => location.toLowerCase().includes(dropOffSearchTerm.toLowerCase()))
                      .map((location) => (
                        <DropdownItem key={location} onMouseDown={() => handleDropOffDropdownSelect(location)}>
                          {location}
                        </DropdownItem>
                      ))}
                  </DropdownContainer>
                )}
              </FormGroup>
              <FormGroup>
                <FormGroupLabel htmlFor="pickupDate">Pickup Date</FormGroupLabel>
                <FormGroupInput
                  id="pickupDate"
                  type="date"
                  value={pickupDate}
                  onChange={(e) => setPickupDate(e.target.value)}
                  min={today}
                />
              </FormGroup>
              <FormGroup>
                <FormGroupLabel htmlFor="dropOffDate">Drop-off Date</FormGroupLabel>
                <FormGroupInput
                  id="dropOffDate"
                  type="date"
                  value={dropOffDate}
                  onChange={(e) => setDropOffDate(e.target.value)}
                  min={pickupDate || today}
                  disabled={!pickupDate}
                />
              </FormGroup>
            </Form>
          </ImageInputBox>
          <SummaryBox>
            <SummaryHeader>Reservation Summary</SummaryHeader>
            <SummaryDetails>
              <DatesContainer>
                <div>
                  <DateLabel>Pickup Date</DateLabel> <br />
                  <DateValue>{pickupDate ? formatDate(pickupDate) : 'N/A'}</DateValue>
                </div>
                <div>
                  <DateLabel>Drop-off Date</DateLabel> <br />
                  <DateValue>{dropOffDate ? formatDate(dropOffDate) : 'N/A'}</DateValue>
                </div>
              </DatesContainer>
              <DateSeparator />
              <SummaryItem>
                <div>
                  <span>Pickup Location</span> <br />
                  <span>{pickupLocation || 'N/A'}</span>
                </div>
              </SummaryItem>
              <SummaryItem>
                <div>
                  <span>Drop-off Location</span> <br />
                  <span>{dropOffLocation || 'N/A'}</span>
                </div>
              </SummaryItem>
              <PriceSummary>Your Price Summary</PriceSummary>
              <SummaryItem>
                <span>Vehicle Rent</span>
                <span>{dailyRent}/day</span>
              </SummaryItem>
              <SummaryItem>
                <span>Discount</span>
                <span>Rs. 0.0</span>
              </SummaryItem>
              <SummaryItem>
                <span>Tax & VAT</span>
                <span>13%</span>
              </SummaryItem>
              <SummaryTotal>
                <span>Total Price</span>
                <span>{totalPrice ? `Rs. ${totalPrice.toFixed(2)}` : 'N/A'}</span>
              </SummaryTotal>
              <ProceedButton onClick={handleSubmit}>Proceed</ProceedButton>
            </SummaryDetails>
          </SummaryBox>
        </MainContent>
      </Content>
    </BookNowContainer>
  );
};

export default ReservationSummary;
