import { Link } from "react-router-dom";
import { useDispatch} from "react-redux";
import { useNavigate } from "react-router-dom";
import { accountActions } from "../store/connection";
import { voterActions } from "../store/voterData";

import { candidateActions } from "../store/candidateData";

export const Header = () => {
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
    <header className="p-3 text-bg-dark">
      <div className="container">
        <div className="d-flex flex-wrap align-items-center justify-content-center justify-content-lg-start">
          <ul className="nav col-12 col-lg-auto me-lg-auto mb-2 justify-content-center mb-md-0">
            <li>
              <Link to="/admin" className="HeaderLinks nav-link px-2 ">
                Show Voter List
              </Link>
            </li>
            <li>
              <Link
                to="/admin/candidateList"
                className="HeaderLinks nav-link px-2 "
              >
                Show Party List
              </Link>
            </li>

            <div className="btn-group">
              <button
                type="button"
                className="btn btn-primary dropdown-toggle"
                data-bs-toggle="dropdown"
                aria-expanded="false"
              >
                Manage Voters
              </button>
              <ul className="dropdown-menu">
                <li>
                  <Link
                    className="dropdown-item"
                    to="/admin/addVoter"
                    
                  >
                    Add Voter
                  </Link>
                </li>
                <li>
                  <Link
                    className="dropdown-item"
                    to="/admin/removeVoter"
                    
                  >
                    Remove Voter
                  </Link>
                </li>
              </ul>
            </div>


            <div className="btn-group">
              <button
                type="button"
                className="btn btn-primary dropdown-toggle"
                data-bs-toggle="dropdown"
                aria-expanded="false"
              >
                Manage Party
              </button>
              <ul className="dropdown-menu">
                <li>
                  <Link
                    className="dropdown-item"
                    to="/admin/addCandidate"
                  >
                    Add Party
                  </Link>
                </li>
                <li>
                  <Link
                    className="dropdown-item"
                    to="/admin/removeCandidate"
                  >
                    Remove Party
                  </Link>
                </li>
              </ul>
            </div>
          </ul>

          <div className="text-end">
            <button
              type="button"
              className="btn btn-outline-light me-2 "
              onClick={goBack}
            >
              Back
            </button>
            <button
              type="button"
              className="btn btn-outline-light me-2 "
              onClick={handleLogout}
            >
              Logout
            </button>
          </div>
        </div>
      </div>
    </header>
  );
};
