import { TextField } from "@mui/material";
import { useForm } from "react-hook-form";
import CredentialsModel from "../../../../../Models/CredentialsModel";

interface PasswordInputProps {
  register: ReturnType<typeof useForm<CredentialsModel>>["register"];
}

function PasswordInput({ register }: PasswordInputProps): JSX.Element {
  return (
    <TextField
      margin="normal"
      required
      fullWidth
      name="password"
      label="Password"
      type="password"
      id="password"
      autoComplete="current-password"
      {...register("password")}
      inputProps={{ min: 4, max: 256 }}
    />
  );
}

export default PasswordInput;
