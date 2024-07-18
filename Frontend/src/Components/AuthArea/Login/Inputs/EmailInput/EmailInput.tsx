import { TextField } from "@mui/material";
import { useForm } from "react-hook-form";
import CredentialsModel from "../../../../../Models/CredentialsModel";

interface EmailInputProps {
  register: ReturnType<typeof useForm<CredentialsModel>>["register"];
}

function EmailInput({ register }: EmailInputProps): JSX.Element {
  return (
    <TextField
      margin="normal"
      required
      fullWidth
      id="email"
      label="Email Address"
      name="email"
      type="email"
      autoComplete="email"
      autoFocus
      {...register("email")}
    />
  );
}

export default EmailInput;
