import React, { useState } from 'react';
import classNames from 'classnames';
import { SectionProps } from '../../../utils/SectionProps';
 import ButtonGroup from '../../elements/ButtonGroup';
import Button from '../../elements/Button';
import Image from '../../elements/Image';
import Modal from '../../elements/Modal';

const propTypes = {
  ...SectionProps.types
}

const defaultProps = {
  ...SectionProps.defaults
}

const Hero = ({
  className,
  topOuterDivider,
  bottomOuterDivider,
  topDivider,
  bottomDivider,
  hasBgColor,
  invertColor,
  ...props
}) => {

  const [videoModalActive, setVideomodalactive] = useState(false);

  const openModal = (e) => {
    e.preventDefault();
    setVideomodalactive(true);
  }

  const closeModal = (e) => {
    e.preventDefault();
    setVideomodalactive(false);
  }   

  const outerClasses = classNames(
    'hero section center-content',
    topOuterDivider && 'has-top-divider',
    bottomOuterDivider && 'has-bottom-divider',
    hasBgColor && 'has-bg-color',
    invertColor && 'invert-color',
    className
  );

  const innerClasses = classNames(
    'hero-inner section-inner',
    topDivider && 'has-top-divider',
    bottomDivider && 'has-bottom-divider'
  );

  return (
    <section
      {...props}
      className={outerClasses}
    > 
     <div className="container-sm reveal-from-bottom" data-reveal-delay="400">
        <div className={innerClasses}>
          <div className="">
           
            {/* Explaination text */}
            <div className='explain_text'>
              <h2>
                <span className="text-color-primary">Payment </span>Page
              </h2>
            </div>
              {/* Print Address */}
              <div className="container-xs">
                <p className="m-0 mb-32 reveal-from-bottom" data-reveal-delay="400">
                    Our this page works on srevices depend on Decentralizaions Apps, and get beautiful results forever.
                </p> 
              </div> 
          </div>
             
          </div>
       
        </div>
        {/* Background Image */}
        <div className='heroPayment_content '>

         <div className='img_bg_pay'>
         </div>
 
        </div>
    
   
     
    </section>
  );
}

Hero.propTypes = propTypes;
Hero.defaultProps = defaultProps;

export default Hero;