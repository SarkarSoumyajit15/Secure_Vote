import { useSelector } from "react-redux";
import { Party } from "./Party.jsx";
import { useEffect, useState } from "react";
import { ethers } from "ethers";
import { contractAddress, infuraApiKey } from "../Constants.js";
import Votingabi from "../abis/Voting.json";
import { VoterWindowHeader } from "./VoterWindowHeader.jsx";

export const VoterWindow = () => {

  const [browserContractInstance,setBrowserContractInstance]= useState(null);
  const [infuraContractInstance,setInfuraContractInstance] = useState(null);
  const [hasVoted,setHasVoted] = useState(false);

  const {account} = useSelector(state=>state.account);

  const { candidateList } = useSelector((state) => state.candidateList);

  const handleCheckboxChange = async (votedParty) => {
    console.log(votedParty);
    try {
      const txn = await browserContractInstance.castVote(votedParty);
      await txn.wait();
      setHasVoted(true);
    } catch (error) {
      console.log(error);
    }
  };


  useEffect(() => {
    const loadPartyInfo = async () => {
      const prov = new ethers.BrowserProvider(ethereum);

      const provinfura = new ethers.JsonRpcProvider(infuraApiKey);

      const bContractInstance = new ethers.Contract(
        contractAddress,
        Votingabi,
        await prov.getSigner()
      );  

      const iContractInstance = new ethers.Contract(
        contractAddress,
        Votingabi,
        provinfura
      );

      setBrowserContractInstance(bContractInstance);
      setInfuraContractInstance(iContractInstance);

      
    };
    loadPartyInfo();
  }, []);
  

  

  useEffect(()=>{
    const votingState = async()=>{
      if(infuraContractInstance){
        const hasAlreadyVoted = await infuraContractInstance.hasVote(account);
        console.log(hasAlreadyVoted);
        setHasVoted(hasAlreadyVoted);
      }
    }
    votingState();
  },[infuraContractInstance])


  return (
    <>
    <VoterWindowHeader/>
    <div className="VoterWindowPartyListContainer">

        {candidateList.map((party, index) => (
          <Party
            party={party}
            handleCheckboxChange={handleCheckboxChange}
            infuraContractInstance={infuraContractInstance}
            hasVoted = {hasVoted}
          />
        ))}

    </div>
    {hasVoted && 
    <div className = "VotingStatus">
    <div className = "VotingState">You have already Voted</div>
    </div>
    }
    </>
  );
};
