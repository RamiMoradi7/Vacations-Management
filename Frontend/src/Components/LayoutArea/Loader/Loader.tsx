import loader from "../../../Assets/Images/Loader.svg";

function Loader(): JSX.Element {
  return (
    <div className="loader-container">
      <img src={loader} alt="Loading..." className="loader-image" />
    </div>
  );
}

export default Loader;
