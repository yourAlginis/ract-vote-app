import React , {useState}from 'react';
import classNames from 'classnames';
import { SectionSplitProps } from '../../../utils/SectionProps';
import {ethers} from 'ethers';
const ByteCode = require('./ByteCode.json');
 
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
   
const abi =[
	{
		"inputs": [
			{
				"internalType": "address",
				"name": "_voterAddress",
				"type": "address"
			}
		],
		"name": "addVoter",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "bool",
				"name": "_choice",
				"type": "bool"
			}
		],
		"name": "doVote",
		"outputs": [
			{
				"internalType": "bool",
				"name": "voted",
				"type": "bool"
			}
		],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [],
		"name": "endVote",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [],
		"name": "startVote",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "string",
				"name": "_ballotOfficialName",
				"type": "string"
			},
			{
				"internalType": "string",
				"name": "_proposal",
				"type": "string"
			}
		],
		"stateMutability": "nonpayable",
		"type": "constructor"
	},
	{
		"anonymous": false,
		"inputs": [
			{
				"indexed": false,
				"internalType": "address",
				"name": "voter",
				"type": "address"
			}
		],
		"name": "voteDone",
		"type": "event"
	},
	{
		"anonymous": false,
		"inputs": [
			{
				"indexed": false,
				"internalType": "uint256",
				"name": "finalResult",
				"type": "uint256"
			}
		],
		"name": "voteEnded",
		"type": "event"
	},
	{
		"anonymous": false,
		"inputs": [],
		"name": "voteStarted",
		"type": "event"
	},
	{
		"anonymous": false,
		"inputs": [
			{
				"indexed": false,
				"internalType": "address",
				"name": "voter",
				"type": "address"
			}
		],
		"name": "voterAdded",
		"type": "event"
	},
	{
		"inputs": [],
		"name": "ballotOfficialAddress",
		"outputs": [
			{
				"internalType": "address",
				"name": "",
				"type": "address"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [],
		"name": "ballotOfficialName",
		"outputs": [
			{
				"internalType": "string",
				"name": "",
				"type": "string"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [],
		"name": "finalResult",
		"outputs": [
			{
				"internalType": "uint256",
				"name": "",
				"type": "uint256"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [],
		"name": "proposal",
		"outputs": [
			{
				"internalType": "string",
				"name": "",
				"type": "string"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [],
		"name": "state",
		"outputs": [
			{
				"internalType": "enum Ballot.State",
				"name": "",
				"type": "uint8"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [],
		"name": "totalVote",
		"outputs": [
			{
				"internalType": "uint256",
				"name": "",
				"type": "uint256"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [],
		"name": "totalVoter",
		"outputs": [
			{
				"internalType": "uint256",
				"name": "",
				"type": "uint256"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "address",
				"name": "",
				"type": "address"
			}
		],
		"name": "voterRegister",
		"outputs": [
			{
				"internalType": "bool",
				"name": "voted",
				"type": "bool"
			}
		],
		"stateMutability": "view",
		"type": "function"
	}
]


	// deploy simple storage contract and paste deployed contract address here. This value is local ganache chain
	// let contractAddress = '0x84735dFae9B8005011B85cb7799CEC5FFd715726';
 
	const [errorMessage, setErrorMessage] = useState(null);
	const [defaultAccount, setDefaultAccount] = useState(null);
	const [connButtonText, setConnButtonText] = useState('Connect Wallet');

	const [provider, setProvider] = useState(null);
	const [signer, setSigner] = useState(null);
	const [contract, setContract] = useState(null);
	let [getContractAddr,setContractAddr] =  useState(null);	
	let [getNameChairMan,setNameChairMan] =  useState(null);
	let [getAsk,setAsk] =  useState(null);
 	let [getValAdress,setValAdress] =  useState(null);
	let [bool,setValVote] =  useState(null);
	let [depNetContract,setdepNetContract] = useState(null);
 
  // Values Store For  Result Voting 
  let [getOfficialAddress,setOfficialAddress] =  useState(null);
	let [getOfficialName,setOfficialName] = useState(null);
 
	// Connect to wallet 
	const connectWalletHandler = () => {
		if (window.ethereum) {

			window.ethereum.request({ method: 'eth_requestAccounts'})
			.then(result => {
				accountChangedHandler(result[0]);
				setConnButtonText('Wallet Connected');
			})
			.catch(error => {
				setErrorMessage(error.message);
			
			});

		} else {
			console.log('Need to install MetaMask');
			setErrorMessage('Please install MetaMask browser extension to interact');
		}
	}
   // important to update account if we have, will cause component re-render
	const accountChangedHandler = (newAccount) => {
		setDefaultAccount(newAccount);
		updateEthers()
	} 
	const updateEthers = () => {
		// Calling Net 
		  let tempProvider = new ethers.providers.Web3Provider(window.ethereum);
		 //let tempProvider = new ethers.providers.JsonRpcProvider("https://rinkeby.infura.io/v3/bc36b26163404dd9b04cbab040d972ff");
		setProvider(tempProvider);

		let tempSigner = tempProvider.getSigner();
		setSigner(tempSigner); 

		let tempContract = new ethers.Contract(getContractAddr, abi, signer);
		setContract(tempContract);
	
	}
	   
	// Start to call my contract method with  get input value 
	const depVoting = async ()=>{ 
	// The factory we use for deploying contracts
	let factory = new ethers.ContractFactory(abi,ByteCode, signer); 
 	 await factory.deploy(getNameChairMan,getAsk).then((tx)=>{
		let  Address =  tx.address;
     	let DepNetContract =  new  ethers.Contract(Address, abi, signer);
		console.log(Address);
		setdepNetContract(DepNetContract);
		setContractAddr(Address);
	});
	}

	// let depNetContract =  new  ethers.Contract("0x2ae4eca74ac85941068f86624f69f469e7d00c54", abi, signer);

	const mainAdminVote = async ()=>{
	// call official adress with name and proposal 
		let OfficialAddress =await depNetContract.ballotOfficialAddress();
		let OfficialName =await depNetContract.ballotOfficialName();
    setOfficialAddress(OfficialAddress);
    setOfficialName(OfficialName)
 	 	console.log("Chairman Address :",OfficialAddress);
		console.log("Chairman Name :",OfficialName);
	}
	const addVoter = async ()=>{ 
 		await depNetContract.addVoter(getValAdress);
  }

	const startVote = async()=>{
		await depNetContract.startVote();
	}

	const insertVoters = async()=>{
		await depNetContract.doVote(bool);
	}

	const endVote = async()=>{
		await depNetContract.endVote();
	}
	
  let [getPorosal,setPorosal] = useState(null);  
  let [getState,setState] = useState(null);
  let [getVotRegist,setVotRegist] = useState(null);
  let [getTotalVotesJoined,setTotalVotesJoined] = useState(null);
  let [getFinalResult,setFinalResult] = useState(null); 
 
	const totalResult = async()=>{

		let finalResult =await depNetContract.finalResult().then((tx)=>{
			return Number(tx._hex);  
	   }); 		 
	   console.log("Result votes  is : ",finalResult);
	   setFinalResult(finalResult);
	   
		let proposal = await depNetContract.proposal();
		console.log(proposal);
    setPorosal(finalResult);
	   
		let state = await depNetContract.state() 
	   console.log("State are :",state);
     setState(state)

		let votes = await depNetContract.totalVote().then((tx)=>{
			return Number(tx._hex);  
	   }); 
	   console.log("Number of Voters :",votes);
     setTotalVotesJoined(votes)

		let voters = await depNetContract.totalVoter().then((tx)=>{
			return Number(tx._hex);  
	   }); 		 
		console.log("All Voters was :",voters);
     setVotRegist(voters)

		let reg= await depNetContract.voterRegister();
		console.log(reg)

	}
	// Get value of input 
	const inputeAsk = event => {
		setAsk(event.target.value);
	 };
	 const inputeNameChairman = event => {
		setNameChairMan(event.target.value);
	 };

	const handleInputAdress = event => {
		setValAdress(event.target.value);
	 };
	 const inputeVote = event => {
		setValVote(event.target.value);
	 };
	

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
    <div className=" ">
        <div className={innerClasses}>
          <div className="">
           
            {/* Explaination text */}
            <div className='ballot_explain_text ml-32 reveal-from-bottom' data-reveal-delay="400">
              <h2>
              HAVE FUN VOTING
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

        {/* Opinion Image  */}
        <div className={splitClasses}>
         <div className="split-item">
              <div className="split-item-content center-content-mobile reveal-from-left" data-reveal-container=".split-item">
                <h3 className="mt-0 mb-12">
             
                </h3>
                <p className="m-2">
                    Tell us your Opinion About this Phone Via <span className="text-color-primary">True </span> or <span className="text-color-primary">False </span>?
                  </p>
                <div className="text-xxs text-color-primary  fw-600 tt-u mb-8">
                
                 
                </div>
              </div>
              <div className={
                classNames(
                  'split-item-image center-content-mobile reveal-from-bottom',
                  imageFill && 'split-item-image-fill'
                )}
                data-reveal-container=".split-item">
                <img src="/images/iphone.jpg" alt="Girl in a jacket" />
              </div>
            </div>
          </div>

          {/* Wallet Connect Script */}
       <div class='reveal-from-bottom mb-5' data-reveal-delay="400">
          <label for="walletConnect" class="form-label">Wallet Address</label>
 			  	<input  
            value={defaultAccount}
            type="text"
            class="form-control" id="walletConnect" 
            disabled  
				  /> 
        <button class=" button  button-primary m-3 reveal-from-bottom" data-reveal-delay="400" onClick={connectWalletHandler}>{connButtonText}</button>
       </div>
      
      
     {/* Create Modal to have Groups */}
   <ul class="nav nav-tabs reveal-from-bottom" id="myTab" role="tablist"   data-reveal-delay="400">
      <li class="nav-item " role="presentation">
        <button class="nav-link active button" id="home-tab" data-bs-toggle="tab" data-bs-target="#home-tab-pane" type="button" role="tab" aria-controls="home-tab-pane" aria-selected="true">Admin</button>
      </li>
      <li class="nav-item" role="presentation">
        <button class="nav-link button" id="profile-tab" data-bs-toggle="tab" data-bs-target="#profile-tab-pane" type="button" role="tab" aria-controls="profile-tab-pane" aria-selected="false">Voters</button>
      </li>
      <li class="nav-item" role="presentation">
        <button class="nav-link button" id="contact-tab" data-bs-toggle="tab" data-bs-target="#contact-tab-pane" type="button" role="tab" aria-controls="contact-tab-pane" aria-selected="false">Results</button>
      </li>
    
    </ul>
    <div class="tab-content" id="myTabContent">
      {/* First Group For Admin */}
     <div class="tab-pane fade show active" id="home-tab-pane" role="tabpanel" aria-labelledby="home-tab" tabindex="0"> 
     {/* First Form */}
      <div class="mb-3 reveal-from-bottom" data-reveal-delay="400">
       <label for="exampleInputEmail1" class="form-label">Voting Quastion</label>
 			 	<input  
				  onChange={inputeAsk}
				  type="text"
          class="form-control" id="exampleInputEmail1" 
				 /> 

       <label for="votName" class="form-label">Chairname Voting</label>
 			 	<input  
				  onChange={inputeNameChairman}
				  type="text"
          class="form-control" id="votName" 
				 />  
        <button class=" button  button-primary m-3 reveal-from-bottom" data-reveal-delay="400" id='btn_id_voting' onClick={depVoting} >Deploy</button>  
			 
      </div>
   
       {/* Second Form */}
     <div class="mb-3 reveal-from-bottom" data-reveal-delay="400">
       <label for="exampleInputEmail1" class="form-label">Rigester Voters</label>
 				 <input  
				  onChange={handleInputAdress}
				  type="text"
          class="form-control" id="exampleInputEmail1" 
				 /> 
       <button class="button  button-primary m-3 reveal-from-bottom" data-reveal-delay="400" id='btn_id_voting' onClick={addVoter} >Add Voter</button>
       <div class="w-100 mt-4"></div>
       <button class="button  button-primary m-1 reveal-from-bottom" data-reveal-delay="400" id='btn_id_voting' onClick={startVote} >Start Vote</button>
       <button class="button  button-primary m-1 reveal-from-bottom" data-reveal-delay="400" id='btn_id_voting' onClick={endVote} >End Vote</button>   
     </div> 
    
      </div>

        {/* Second Group for Voters*/}       
      <div class="tab-pane fade reveal-from-bottom" data-reveal-delay="400" id="profile-tab-pane" role="tabpanel" aria-labelledby="profile-tab" tabindex="0">
       <div class="mb-3">
        <label for="exampleInputEmail1" class="form-label">Your Opinion</label>
        <select class="form-control" id="exampleInputEmail1"  onChange={inputeVote}>
            <option value="true">True</option>
            <option value="false">False</option>
        </select>
          <button class='button  button-primary m-3' id='btn_id_voting' onClick={insertVoters} >Send Vote</button>
       </div> 
      </div>

        {/* Third Group for Result */}
      <div class="tab-pane fade" id="contact-tab-pane" role="tabpanel" aria-labelledby="contact-tab" tabindex="0">
          {/* First table for Details Admin Vote  */}
         <button class="button  button-primary m-3" id='btn_id_voting' onClick={mainAdminVote} >Details Admin vote</button>
           <table class="table table-dark table-striped " >
             <thead class="">
               <tr>
                  <th scope="col" className='p-2'>Contract Adress</th>
                  <th scope="col" className='p-2'>Chairman Address</th>
                  <th scope="col" className='p-2'>Chairman Name</th>
               </tr>
             </thead>
             <tbody> 
               <tr>
                  <td className='p-2'>{getContractAddr}</td>
                  <th className='p-2'>{getOfficialAddress}</th>
                  <td className='p-2'>{getOfficialName}</td>
               </tr> 
             </tbody>
           </table>
           <div className='w-100 mt-5'></div>

          {/* Second table for Result Voters  */}
           <button class='button  button-primary m-3' id='btn_id_voting' onClick={totalResult} >Result Voters</button>
           <table class="table table-dark table-striped" >
             <thead>
               <tr>
                  <th scope="col" className='p-2'>Voters Registered in Contract</th>
                  <th scope="col" className='p-2'>Total Joined to vote</th>
                  <th scope="col" className='p-2'>Total Result Vote</th>
               </tr>
             </thead>
             <tbody> 
               <tr>
                  <td className='p-2'>{getVotRegist}</td>
                  <th className='p-2'>{getTotalVotesJoined}</th>
                  <td className='p-2'>{getFinalResult}</td>
               </tr> 
             </tbody>
           </table>
      </div>
     </div>
  </section>
 
  );
}

FeaturesSplit.propTypes = propTypes;
FeaturesSplit.defaultProps = defaultProps;

export default FeaturesSplit;