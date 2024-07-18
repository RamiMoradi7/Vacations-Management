import { Grid, IconButton, InputAdornment, TextField } from "@mui/material";
import { useForm } from "react-hook-form";
import UserModel from "../../../../../Models/UserModel";
import { useState } from "react";
import { Visibility, VisibilityOff } from "@mui/icons-material";

interface PasswordInputProps {
  register: ReturnType<typeof useForm<UserModel>>["register"];
}

function PasswordInput({ register }: PasswordInputProps): JSX.Element {
  const [showPassword, setShowPassword] = useState(false);

  const togglePasswordVisibility = () => {
    setShowPassword((prevShowPassword) => !prevShowPassword);
  };
  return (
    <Grid item xs={12}>
      <TextField
        required
        fullWidth
        name="password"
        label="Password"
        type={showPassword ? "text" : "password"}
        id="password"
        autoComplete="new-password"
        {...register("password")}
        inputProps={{ min: 4, max: 256 }}
        InputProps={{
          endAdornment: (
            <InputAdornment position="end">
              <IconButton onClick={togglePasswordVisibility} edge="end">
                {showPassword ? <VisibilityOff /> : <Visibility />}
              </IconButton>
            </InputAdornment>
          ),
        }}
      />
    </Grid>
  );
}

export default PasswordInput;
