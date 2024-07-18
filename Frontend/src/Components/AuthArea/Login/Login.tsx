import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import Avatar from "@mui/material/Avatar";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import Grid from "@mui/material/Grid";
import Paper from "@mui/material/Paper";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import Typography from "@mui/material/Typography";
import { useForm } from "react-hook-form";
import { NavLink, useNavigate } from "react-router-dom";
import useTitle from "../../../Hooks/UseTitle";
import CredentialsModel from "../../../Models/CredentialsModel";
import { appStore } from "../../../Redux/Store";
import { authService } from "../../../Services/AuthService";
import { notify } from "../../../Utils/Notify";
import EmailInput from "./Inputs/EmailInput/EmailInput";
import PasswordInput from "./Inputs/PasswordInput/PasswordInput";
import "./Login.css";

function Login() {
  useTitle("Login");
  const defaultTheme = createTheme();
  const { register, handleSubmit } = useForm<CredentialsModel>();
  const navigate = useNavigate();

  async function login(credentials: CredentialsModel) {
    try {
      await authService.login(credentials);
      const firstName = appStore.getState().user.firstName;
      notify.success(`Welcome back ${firstName} 😊`);
      navigate("/vacations");
    } catch (err: any) {
      notify.error(err);
    }
  }

  return (
    <ThemeProvider theme={defaultTheme}>
      <Grid container component="main">
        <CssBaseline />
        <Grid item xs={false} sm={4} md={7} className="login-wallpaper" />
        <Grid item xs={12} sm={8} md={5} component={Paper} elevation={6} square>
          <Box className="login-container">
            <Avatar className="login-avatar">
              <LockOutlinedIcon />
            </Avatar>
            <Typography component="h1" variant="h5" sx={{ mb: 3 }}>
              Login
            </Typography>
            <Box
              component="form"
              onSubmit={handleSubmit(login)}
              className="login-form"
            >
              <EmailInput register={register} />
              <PasswordInput register={register} />
              <Button
                type="submit"
                fullWidth
                variant="contained"
                className="login-button"
              >
                Login
              </Button>
              <Grid container justifyContent="flex-end">
                <Grid item>
                  <NavLink
                    to={"/register"}
                    style={{
                      textDecoration: "none",
                      color: defaultTheme.palette.primary.main,
                    }}
                  >
                    Don't have an account? Register
                  </NavLink>
                </Grid>
              </Grid>
            </Box>
          </Box>
        </Grid>
      </Grid>
    </ThemeProvider>
  );
}

export default Login;
