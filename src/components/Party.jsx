
import { useEffect, useState } from "react";


export const Party = ({
  party,
  handleCheckboxChange,
  infuraContractInstance,
  hasVoted
}) => {
  const [symbol, setSymbol] = useState(null);
  const [candidateName, setCandidateName] = useState(null);


  useEffect(() => {
    const partyInfo = async () => {
      if (infuraContractInstance != null) {
        const symboluri = await infuraContractInstance.getPartySymbol(party);
        const candidate = await infuraContractInstance.getPartyCandidate(party);

        setSymbol(symboluri);
        setCandidateName(candidate);

        console.log(symboluri);
      }
    };
    partyInfo();
  }, [infuraContractInstance],[hasVoted]);

  return (
    <div className="card">
    <div className="img-body">
      
      <img src={symbol} className="card-img-top" alt="Party" />
    </div>
      <div className="card-body">
        <center>
          <h5 className="card-title"> Party : {party}</h5>
          <p className="card-text">Candidate : {candidateName}</p>
          <button onClick={() => handleCheckboxChange(party)} disabled={hasVoted}>Vote</button>
        </center>
      </div>
    </div>
  );
};

// hasVoted ? 
//           <a>You have already voted</a>
//           :