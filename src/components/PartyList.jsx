import { useDispatch, useSelector } from "react-redux";
import { Voter } from "./Voter.jsx";


export const PartyList = () => {
  const dispatch = useDispatch();
  const { candidateList } = useSelector((state) => state.candidateList);
  

  return (

    <div className="container text-center VoterListContainer">
      <div className="row VoterListIndex ">
        <div className="col-sm-3">Index</div>
        <div className="col-sm-7">Voter Address</div>
      </div>
      {candidateList.map((candidate, index) => (
        <Voter voter={candidate} index={index} />
      ))
      }
    </div>
  );
};

