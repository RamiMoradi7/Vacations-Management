import React from "react";
import "./Home.css";
import { NavLink } from "react-router-dom";
import { useSelector } from "react-redux";
import { AppState } from "../../../Redux/AppState";
import useTitle from "../../../Hooks/UseTitle";

const Home: React.FC = () => {
  const user = useSelector((appState: AppState) => appState.user);
  useTitle("Home Page");
  return (
    <section className="Home-Section">
      <div className="Home-Content">
        <p>Your vacation starts here!</p>
        <p>Find your next stay Search low prices on vacations.</p>
        <p>Don't forget to check our crazy deals! </p>
        {!user && (
          <NavLink className="Link" to={"/register"}>
            Join Us !
          </NavLink>
        )}
        {user && (
          <NavLink className="Link" to={"/vacations"}>
            Check out our available vacations.
          </NavLink>
        )}
      </div>
    </section>
  );
};

export default Home;
