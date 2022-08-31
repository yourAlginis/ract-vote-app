import React from 'react';
// import sections
import HeroVoting from '../components/sections/votingFolder/heroVoting';
import Ballot from '../components/sections/votingFolder/ballotScript';
import Testimonial from '../components/sections/Testimonial';
import Cta from '../components/sections/Cta';

const Voting = () => {

  return (
    <>
      <HeroVoting className="illustration-section-01" />
       
      <Ballot   />
      <Testimonial topDivider />
      <Cta split />
    </>
  );
}

export default Voting;