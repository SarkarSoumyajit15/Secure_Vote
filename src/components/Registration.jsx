
import { useRef, useState } from "react";
import { voterActions } from "../store/voterData";
import { useDispatch, useSelector } from "react-redux";
import { ContractConnection } from "./ContractConnection.store";

export const Registration = ()=>{

    // const {browserContractInstance} = useSelector((state)=>state.contractInstance)

    const [browserContractInstance,setBrowserContractInstance]= useState(null);
    const [infuraContractInstance,setInfuraContractInstance] = useState(null);

    ContractConnection(setInfuraContractInstance,setBrowserContractInstance);

    const inputRef1 = useRef();
    const dispatch = useDispatch();


    const addNewVoter = async(event)=>{
        event.preventDefault();
        
        const voter = inputRef1.current.value;
        
        const txn = await browserContractInstance.addVoter(voter);
        await txn.wait();
        dispatch(voterActions.addVoter({voter}));
        inputRef1.current.value = null;
      }


    return(
        <center>
          <center className="ManageVoterRegistrationContainer">
          <div className="ManageVoterRegistrationTitle">
            <h3>Voter Registration Window</h3>
          </div>
          <div className="ManageVoterFormContainer">
            <form onSubmit={addNewVoter}>
              <div className="mb-3">
                <label className="form-label ManageVoterForm">
                  Add New Voter
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