export const Voter = ({ voter, index }) => {
  return (

    <div className="row ">
      <div className="col-sm-3 voterIndexContainer">{index}</div>
      <div className="col-sm-7 voterAddressContainer">{voter}</div>
    </div>
  );
};
