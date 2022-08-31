import React , {useState}from 'react';
import classNames from 'classnames';
import { SectionSplitProps } from '../../../utils/SectionProps';
import {ethers} from 'ethers'; 
 
const propTypes = {
  ...SectionSplitProps.types
}

const defaultProps = {
  ...SectionSplitProps.defaults
}

const FeaturesSplit = ({
  className,
  topOuterDivider,
  bottomOuterDivider,
  topDivider,
  bottomDivider,
  hasBgColor,
  invertColor,
  invertMobile,
  invertDesktop,
  alignTop,
  imageFill,
  ...props
}) => {
 
	const [getValInputSender , SetValInputSender] =  useState(null); 
	const [GetValInput , SetValInput] =  useState(null); 
	const [GetValETH , SetValETH] =  useState(null);  
	let [getSenderAddr , setSenderAddr] =  useState(null);  
	let [getLinkTx, setLinkTx] =  useState(null);  
	let [getTxLink,setTxLink] =  useState(null);

	
	// open connection
	const provider = new ethers.providers.JsonRpcProvider( "https://rinkeby.infura.io/v3/bc36b26163404dd9b04cbab040d972ff");
	const getDataSender =  val =>{
		SetValInputSender(val.target.value) 
	  } 

	const getDataReciver =  val =>{
		SetValInput(val.target.value) 
	  } 
	  const getDataEth =  val =>{
		SetValETH(val.target.value) 
	  } 
	 
	  const sendTxFunction = async ()=>{
      alert("After 33 Second you will have result")

		// send Transations By using privetKey and wallet 
		const wallet =  new ethers.Wallet(getValInputSender , provider) ; 

        // Transaction Process 
        const  tx = {
            to: GetValInput,
            value: ethers.utils.parseEther(GetValETH)
        }

        // Run transaction 
        let send_val =  await wallet.sendTransaction(tx) 

        // wait for Transaction to be mined : 
        await send_val.wait() 
		  let linkTX = "https://rinkeby.etherscan.io/tx/".concat(send_val.hash);
		  setTxLink(linkTX);		
		  console.log(linkTX)
		 
      alert("Your Transaction is Done ")
    }
	const  demotx = async()=>{
		console.log(getTxLink);
	}

  const outerClasses = classNames(
    'features-split section',
    topOuterDivider && 'has-top-divider',
    bottomOuterDivider && 'has-bottom-divider',
    hasBgColor && 'has-bg-color',
    invertColor && 'invert-color',
    className
  );

  const innerClasses = classNames(
    'features-split-inner section-inner',
    topDivider && 'has-top-divider',
    bottomDivider && 'has-bottom-divider'
  );

  const splitClasses = classNames(
    'split-wrap',
    invertMobile && 'invert-mobile',
    invertDesktop && 'invert-desktop',
    alignTop && 'align-top'
  );

  const sectionHeader = {
    title: 'SERVICES',
    paragraph: 'Here we have some SERVICES for you, let us check all Details below the section .'
  };

  return ( 
 
  <section
      {...props}
      className="container"
    > 
        <div className={innerClasses}> 
            {/* Explaination text */}
            <div className='ballot_explain_text ml-32 reveal-from-bottom' data-reveal-delay="400">
              <h2>
              SECRET ETHERUM PAY VIA BLOCKCHAIN 
              </h2>
            </div>              
        </div>
            
        {/* Opinion Image  */}
        <div className={splitClasses}>
         <div className="split-item reveal-from-bottom" data-reveal-delay="400">

			{/* Script form to send transactions  */}
            <div className="split-item-content center-content-mobile reveal-from-left" data-reveal-container=".split-item">
			 	{/* Sender Address */}
			  <label for="exampleInputEmail1" class="form-label">Privet Key : Your Sender Wallet</label>
 			 	<input  
				  onChange={getDataSender}
				  type="text"
         		 class="form-control" id="exampleInputEmail1" 
				 /> 
			 	{/* Reciver Address */}
			  <label for="exampleInputEmail1" class="form-label">Reciver Address</label>
 			 	<input  
				  onChange={getDataReciver}
				  type="text"
         		 class="form-control" id="exampleInputEmail1" 
				 /> 
				{/* Main Vlue will be send */}
      		  <label for="votName" class="form-label">Ethrume Value</label>
 			 	<input  
				  onChange={getDataEth}
				  type="text"
          		  class="form-control" id="votName" 
				 />  
        	  <button class=" button  button-primary m-3 reveal-from-bottom" data-reveal-delay="400" id='btn_id_voting' onClick={sendTxFunction} >Send Transaction</button>       
			     
			  <button class=" button   m-3 reveal-from-bottom" data-reveal-delay="400" id='btn_id_payment_link'><a href={getTxLink} target="_blank">More Details</a></button>
			  </div>

			  {/* Image  */}
              <div claHighlightsssName={
                classNames(
                  'split-item-image center-content-mobile reveal-from-bottom',
                  imageFill && 'split-item-image-fill'
                )}
                data-reveal-container=".split-item">
                <img src="/images/etherum.jpg" alt="Girl in a jacket" />
              </div>
            </div>
          </div>

       
      
      
  </section>
 
  );
}

FeaturesSplit.propTypes = propTypes;
FeaturesSplit.defaultProps = defaultProps;

export default FeaturesSplit;