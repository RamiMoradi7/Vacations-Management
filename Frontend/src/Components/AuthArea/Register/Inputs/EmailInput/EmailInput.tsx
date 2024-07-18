import { Grid, TextField } from "@mui/material";
import { useForm } from "react-hook-form";
import UserModel from "../../../../../Models/UserModel";

interface EmailInputProps {
  register: ReturnType<typeof useForm<UserModel>>["register"];
}

function EmailInput({ register }: EmailInputProps): JSX.Element {
  return (
    <Grid item xs={12}>
      <TextField
        required
        type="email"
        fullWidth
        id="email"
        label="Email Address"
        name="email"
        autoComplete="email"
        {...register("email")}
      />
    </Grid>
  );
}

export default EmailInput;
