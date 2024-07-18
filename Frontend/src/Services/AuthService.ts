import axios from "axios";
import { jwtDecode } from "jwt-decode";
import CredentialsModel from "../Models/CredentialsModel";
import UserModel from "../Models/UserModel";
import { authActions } from "../Redux/AuthSlice";
import { appStore } from "../Redux/Store";
import { appConfig } from "../Utils/AppConfig";
import { vacationActions } from "../Redux/VacationsSlice";

class AuthService {
  public constructor() {
    const token = sessionStorage.getItem("token");
    if (token) {
      const loggedInUser = jwtDecode<{ user: UserModel }>(token).user;
      appStore.dispatch(authActions.login(loggedInUser));
    }
  }

  public async register(user: UserModel): Promise<void> {
    const response = await axios.post<string>(appConfig.registerUrl, user);
    const token = response.data;
    const registeredUser = jwtDecode<{ user: UserModel }>(token).user;
    appStore.dispatch(authActions.register(registeredUser));
    sessionStorage.setItem("token", token);
  }

  public async login(credentials: CredentialsModel): Promise<void> {
    const response = await axios.post<string>(appConfig.loginUrl, credentials);
    const token = response.data;
    const loggedInUser = jwtDecode<{ user: UserModel }>(token).user;
    appStore.dispatch(authActions.login(loggedInUser));
    sessionStorage.setItem("token", token);
  }
  public logOut(): void {
    appStore.dispatch(authActions.logOut());
    appStore.dispatch(vacationActions.resetVacations());
    sessionStorage.removeItem("token");
  }
}
export const authService = new AuthService();
