import { useSelector } from "react-redux";
import { Navigate, Route, Routes } from "react-router-dom";
import { AppState } from "../../../Redux/AppState";
import AddVacation from "../../VacationsArea/Form/AddVacation/AddVacation";
import AdminChart from "../../VacationsArea/Reports/Reports";
import EditVacation from "../../VacationsArea/Form/EditVacation/EditVacation";
import Login from "../../AuthArea/Login/Login";
import Register from "../../AuthArea/Register/Register";
import Home from "../../HomeArea/Home/Home";
import VacationList from "../../VacationsArea/VacationList/VacationList";
import Page404 from "../page404/page404";
import "./Routing.css";

function Routing(): JSX.Element {
  const currentUser = useSelector((appState: AppState) => appState.user);

  return (
    <div className="Routing">
      <Routes>
        <Route path="/home" element={<Home />} />
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />
        <Route
          path="/vacations"
          element={currentUser ? <VacationList /> : <Login />}
        />
        {currentUser?.roleId === 1 && (
          <>
            <Route path="/vacations/new" element={<AddVacation />} />
            <Route path="/vacations/edit/:id" element={<EditVacation />} />
            <Route path="/reports" element={<AdminChart />} />
          </>
        )}
        {!currentUser && (
          <>
            <Route path="/vacations/new" element={<Navigate to="/login" />} />
            <Route
              path="/vacations/edit/:id"
              element={<Navigate to="/login" />}
            />
          </>
        )}
        <Route path="/" element={<Home />} />
        <Route path="*" element={<Page404 />} />
      </Routes>
    </div>
  );
}

export default Routing;
