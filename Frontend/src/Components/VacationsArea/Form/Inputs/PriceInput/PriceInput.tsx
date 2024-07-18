import { FormLabel } from "@mui/joy";
import { TextField } from "@mui/material";
import { useForm, useFormState } from "react-hook-form";
import { VacationModel } from "../../../../../Models/VacationModel";

interface PriceInputProps {
  register: ReturnType<typeof useForm<VacationModel>>["register"];
  errors: ReturnType<typeof useFormState<VacationModel>>["errors"];
}
function PriceInput({ register, errors }: PriceInputProps): JSX.Element {
  return (
    <div>
      {errors.price && <p className="error active">{errors.price.message}</p>}
      <FormLabel>Price</FormLabel>
      <TextField
        type="number"
        {...register("price", VacationModel.priceValidation)}
        label="$"
      />
    </div>
  );
}

export default PriceInput;
