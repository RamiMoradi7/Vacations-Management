import { LogoutOutlined, LogoutRounded } from "@mui/icons-material";
import { useSelector } from "react-redux";
import { NavLink } from "react-router-dom";
import UserModel from "../../../Models/UserModel";
import { AppState } from "../../../Redux/AppState";
import { authService } from "../../../Services/AuthService";
import { notify } from "../../../Utils/Notify";
import "./AuthMenu.css";

function AuthMenu() {
  const user = useSelector<AppState, UserModel>((appState) => appState.user);
  function logOut(): void {
    notify.success(`Hope to see you back ${user.firstName}`);
    authService.logOut();
  }
  if (user) {
    return (
      <div className="AuthMenu">
        <span>
          Hello {user.firstName} {user.lastName}
        </span>
        <NavLink className="NavLink" onClick={logOut} to="/home">
          | <LogoutRounded />
        </NavLink>
      </div>
    );
  }
  return (
    <div className="AuthMenu">
      <span>Hello Guest | </span>
      <NavLink className="NavLink" to="/login">
        Login
      </NavLink>
      <NavLink className="NavLink" to="/register">
        Register
      </NavLink>
    </div>
  );
}

export default AuthMenu;
