
import { useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { candidateActions } from "../store/candidateData";
import { ContractConnection } from "./ContractConnection.store";

export const RemoveParty = ()=>{

  const [browserContractInstance,setBrowserContractInstance]= useState(null);
  const [infuraContractInstance,setInfuraContractInstance] = useState(null);

  ContractConnection(setInfuraContractInstance,setBrowserContractInstance);

    const inputRef1 = useRef(null);
    const dispatch = useDispatch();


    const removeCandidate = async(event)=>{
        event.preventDefault();
        
        const candidate = inputRef1.current.value;
        
        const txn = await browserContractInstance.removeParty(candidate);
        await txn.wait();
        dispatch(candidateActions.removeCandidate({candidate}));
        inputRef1.current.value = "";
      }


    return(
        <center>
          <center className="ManageVoterRegistrationContainer">
          <div className="ManageVoterRegistrationTitle">
            <h3>Candidate Removal Window</h3>
          </div>
          <div className="ManageVoterFormContainer">
            <form onSubmit={removeCandidate}>
              <div className="mb-3">
                <label className="form-label ManageVoterForm">
                  Remove Candidate
                </label>
                <input
                  type="text"
                  ref={inputRef1}
                  className="form-control"
                  id="exampleInputEmail1"
                  aria-describedby="emailHelp"
                  placeholder="Party name"
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