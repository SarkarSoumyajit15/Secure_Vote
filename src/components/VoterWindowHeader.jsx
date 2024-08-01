import { useDispatch } from "react-redux";
import { accountActions } from "../store/connection";
import { voterActions } from "../store/voterData";
import { candidateActions } from "../store/candidateData";
import { useNavigate } from "react-router-dom";

export const VoterWindowHeader = () => {


  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLogout = async () => {
    dispatch(accountActions.disconnect());
    dispatch(voterActions.disconnect());
    dispatch(candidateActions.disconnect());
    navigate("/");
  };

  const goBack = () => {
    navigate("/");
  };

  return (
    <header className="p-3 bg-dark text-white">
      <div className="container">
        <div className="VoterHeaderContainer">
          
            <button
              type="button"
              className="btn btn-outline-light me-2"
              onClick={goBack}
            >
              Go Back
            </button>
            <button
              type="button"
              className="btn btn-warning"
              onClick={handleLogout}
            >
              Logout
            </button>
          
        </div>
      </div>
    </header>
  );
};
