import React from 'react';
// import sections
import HeroPayment from '../components/sections/paymentFolder/heroPayment';
import PaymentScript from '../components/sections/paymentFolder/paymentScript'; 

const Voting = () => {

  return (
    <>
      <HeroPayment className="illustration-section-01" />       
      <PaymentScript invertMobile topDivider imageFill className="illustration-section-02" />            
    </>
  );
}

export default Voting;