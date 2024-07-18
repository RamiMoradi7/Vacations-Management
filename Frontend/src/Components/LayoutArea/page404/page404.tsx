import PageNotFound from "../../../Assets/Images/Page404.gif";
import useTitle from "../../../Hooks/UseTitle";
import "./page404.css";

function Page404(): JSX.Element {
  useTitle("Page Not Found");
  return (
    <div className="page404">
      <div className="content">
        <h1 className="title">404 - Page Not Found</h1>
        <p className="message">
          The page you are looking for might have been removed, had its name
          changed, or is temporarily unavailable.
        </p>
        <img src={PageNotFound} alt="page-not-found" className="image" />
      </div>
    </div>
  );
}

export default Page404;
