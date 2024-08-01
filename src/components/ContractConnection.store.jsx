import { ethers } from "ethers";
import { useEffect, useState } from "react";
import { contractAddress, infuraApiKey } from "../Constants";
import Votingabi from "../abis/Voting.json"


export const ContractConnection = (setInfuraContractInstance,setBrowserContractInstance)=>{

    useEffect(() => {
        const loadPartyInfo = async () => {
          const prov = new ethers.BrowserProvider(ethereum);
    
          const provinfura = new ethers.JsonRpcProvider(infuraApiKey);
    
          const bContractInstance = new ethers.Contract(
            contractAddress,
            Votingabi,
            await prov.getSigner()
          );  
    
          const iContractInstance =  new ethers.Contract(
            contractAddress,
            Votingabi,
            provinfura
          );

          console.log(iContractInstance);
          setBrowserContractInstance(bContractInstance);
          setInfuraContractInstance(iContractInstance);
    
        };
        loadPartyInfo();
    }, []);
}