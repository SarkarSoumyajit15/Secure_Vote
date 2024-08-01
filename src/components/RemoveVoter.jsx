
import { useRef, useState } from "react";
import { voterActions } from "../store/voterData";
import { useDispatch, useSelector } from "react-redux";
import { ContractConnection } from "./ContractConnection.store";

export const RemoveVoter = ()=>{

  const [browserContractInstance,setBrowserContractInstance]= useState(null);
  const [infuraContractInstance,setInfuraContractInstance] = useState(null);

  ContractConnection(setInfuraContractInstance,setBrowserContractInstance);

    const inputRef1 = useRef(null);
    const dispatch = useDispatch();


    const removeVoter = async(event)=>{
        event.preventDefault();
        
        const voter = inputRef1.current.value;
        
        const txn = await browserContractInstance.removeVoter(voter);
        await txn.wait();
        dispatch(voterActions.removeVoter({voter}));
        inputRef1.current.value = "";
      }


    return(
        <center>
          <center className="ManageVoterRegistrationContainer">
          <div className="ManageVoterRegistrationTitle">
            <h3>Voter Removal Window</h3>
          </div>
          <div className="ManageVoterFormContainer">
            <form onSubmit={removeVoter}>
              <div className="mb-3">
                <label className="form-label ManageVoterForm">
                  Remove Voter
                </label>
                <input
                  type="text"
                  ref={inputRef1}
                  className="form-control"
                  id="exampleInputEmail1"
                  aria-describedby="emailHelp"
                  placeholder="Voter address"
                />
              </div>

              <button type="submit" className="btn btn-primary">
                Submit
              </button>
            </form>
          </div>
        </center>
        </center>
    )
}