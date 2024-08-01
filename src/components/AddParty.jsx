
import { useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { candidateActions } from "../store/candidateData";
import DragAndDrop from "./DragAndDrop";
import axios from "axios";
import { ContractConnection } from "./ContractConnection.store";

export const AddParty = ()=>{

  const [browserContractInstance,setBrowserContractInstance]= useState(null);
  const [infuraContractInstance,setInfuraContractInstance] = useState(null);

  ContractConnection(setInfuraContractInstance,setBrowserContractInstance);
    const [selectedFile,setSelectedFile]=useState(null)


    const inputRef1 = useRef(null);
    const inputRef2 = useRef(null);
    const inputRef3 = useRef(null);
    const dispatch = useDispatch();



    const addNewCandidate = async(event)=>{
        event.preventDefault();
        
        const candidate = inputRef1.current.value;
        const candidateName = inputRef2.current.value;

        const symbol =inputRef3.current;
        console.log(symbol);
        

        
        const formData = new FormData();

        formData.append("file",selectedFile);
        
        
        const metadata = JSON.stringify({
          name: "Party Symbol",
        });
        formData.append("pinataMetadata", metadata);

        
        const options = JSON.stringify({
          cidVersion: 0,
        });
        formData.append("pinataOptions", options);
        
        const responseData = await axios({
          method :"post",
          url : "https://api.pinata.cloud/pinning/pinFileToIPFS",
          data : formData,
          headers : {
            // Authorization: `Bearer ${import.meta.env.VITE_PINATA_JWT}`,
            pinata_api_key : import.meta.env.VITE_PINATA_API_KEY,
            pinata_secret_api_key : import.meta.env.VITE_PINATA_API_SECRET,
            "Content-Type" : "multipart/form-data"
          },
        });

        console.log(responseData)

        const fileURL = "https://gateway.pinata.cloud/ipfs/" + responseData.data.IpfsHash;
        console.log(fileURL);

        console.log(browserContractInstance);

        const txn = await browserContractInstance.addParty(candidate,fileURL,candidateName);
        await txn.wait();
        dispatch(candidateActions.addCandidate({candidate}));
        inputRef1.current.value = "";
      }


    return(
        <center>
        <center className="ManageVoterRegistrationContainer">
        <div className="ManageVoterRegistrationTitle">
          <h3>Candidate Registration Window</h3>
        </div>
        <div className="ManageVoterFormContainer">
          <form onSubmit={addNewCandidate}>
            <div className="mb-3">
              <label className="form-label ManageVoterForm">
                Add New Party Name
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
            <div className="mb-3">
              <label className="form-label ManageVoterForm">
                Add New Candidate Name
              </label>
              <input
                type="text"
                ref={inputRef2}
                className="form-control"
                id="exampleInputEmail1"
                aria-describedby="emailHelp"
                placeholder="Candidate name"
              />
            </div>
            <DragAndDrop  file = {selectedFile} setFile = {setSelectedFile}/>
            <button type="submit"  className="btn btn-primary">
              Submit
            </button>
          </form>
        </div>
      </center>
        </center>
    )
  }
  // <input type = "file" onChange={handleChange} ref = {inputRef3}/>