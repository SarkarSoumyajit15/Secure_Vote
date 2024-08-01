import { useDispatch, useSelector } from "react-redux";

import { Voter } from "./Voter.jsx";

export const VoterList = () => {
  const dispatch = useDispatch();
  const { voterList } = useSelector((state) => state.voterList);


  return (

    <div className="container text-center VoterListContainer">
      <div className="row VoterListIndex ">
        <div className="col-sm-3">Index</div>
        <div className="col-sm-7">Voter Address</div>
      </div>
      {voterList.map((voter, index) => (
        <Voter voter={voter} index={index} />
      ))}
    </div>
  );
};

