import { useDispatch, useSelector } from "react-redux";

import { accountActions } from "../store/connection";

import { contractAddress } from "../Constants";
import Votingabi from "../abis/Voting.json"
import { useEffect } from "react";
import { ethers } from "ethers";
import { useNavigate } from "react-router-dom";
import { admin } from "../Constants.js";
import { infuraApiKey } from "../Constants.js";
import { voterActions } from "../store/voterData.jsx";
import { candidateActions } from "../store/candidateData.jsx";



const { ethereum } = window;

export const Frontpage = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();


  // Subscribe to account slice of the store
  const { account } = useSelector((state) => state.account);




  
  // Load the metamask browser provider

  const loadProvider = async () => {
    const prov = new ethers.BrowserProvider(ethereum);
    
    const provinfura = new ethers.JsonRpcProvider(
        infuraApiKey
      );



      const browserContractInstance = new ethers.Contract(
        contractAddress,
        Votingabi,
        await prov.getSigner()
      );
      
      const infuraContractInstance = new ethers.Contract(
        contractAddress,
        Votingabi,
        provinfura
      );



      console.log(browserContractInstance);
      console.log(infuraContractInstance);

      const loadInitialVoterList = async () => {
        const voterListInitialObj = await infuraContractInstance.getVoters();
        const voterListInitial = Object.values(voterListInitialObj);
        dispatch(voterActions.addInitialVoter({ voterListInitial }));
      };

      loadInitialVoterList();

      const loadInitialCandidateList = async () => {
        const candidateListInitialObj = await infuraContractInstance.getParties();
        const candidateListInitial = Object.values(candidateListInitialObj);
        dispatch(candidateActions.addInitialCandidate({ candidateListInitial }));
      };
  
      loadInitialCandidateList();
      
      
    };
    
    useEffect(() => {
      loadProvider();
    },[]);
    


  // Connect to account
  const handleConnect = async () => {
    const accounts = await window.ethereum.request({
      method: "eth_requestAccounts",
    });
    const acc = accounts[0];
    dispatch(accountActions.connect({ acc }));

    // if(acc == admin.toLowerCase())
    //   navigate("/admin");
    // else 
    //   navigate("/voter");
    handleNavigate(acc);
  };

  const handleNavigate = async(acc)=>{
    if(acc == admin.toLowerCase())
      navigate("/admin");
    else 
      navigate("/voter");
  }


  // Change the account
  const handleChange = async () => {
    await ethereum.request({
      method: "wallet_requestPermissions",
      params: [
        {
          eth_accounts: {},
        },
      ],
    });
    const accounts = await window.ethereum.request({
      method: "eth_requestAccounts",
    });
    const acc = accounts[0];
    dispatch(accountActions.change({ acc }));

    if(acc == admin.toLowerCase())
      navigate("/admin");
    else 
      navigate("/voter");
  };

  




  return (
    <div className="bg-dark text-secondary px-4 py-5 text-center frontpageContainer">
      <div className="py-5">
        <h1 className="display-5 fw-bold text-white"> Voting D-App </h1>
        <div className="col-lg-6 mx-auto">
          <p className="fs-5 mb-4">HELLO PUBLIC</p>
          <div className="d-grid gap-2 d-sm-flex justify-content-sm-center">
            {account ? (
              <button
                type="button"
                className="btn btn-outline-info btn-lg px-4 me-sm-3 fw-bold"
                fdprocessedid="eaofx9"
              >
                {account.slice(0, 6) + "..." + account.slice(38, 42)}
              </button>
            ) : (
              <button
                type="button"
                className="btn btn-outline-info btn-lg px-4 me-sm-3 fw-bold"
                fdprocessedid="eaofx9"
                onClick={handleConnect}
              >
                Connect
              </button>
            )}

            {account && (
              <button
                type="button"
                className="btn btn-outline-light btn-lg px-4 frontpageBotton"
                fdprocessedid="7ill2l"
                onClick={handleChange}
              >
                Change Account
              </button>
            )}
            {account && (
              <button
                type="button"
                className="btn btn-outline-light btn-lg px-4 frontpageBotton"
                fdprocessedid="7ill2l"
                onClick={()=>{handleNavigate(account)}}
              >
                Next
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
