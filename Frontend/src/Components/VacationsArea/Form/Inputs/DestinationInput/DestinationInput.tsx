import { FormLabel } from "@mui/joy";
import { Input } from "@mui/material";
import { useForm, useFormState } from "react-hook-form";
import { VacationModel } from "../../../../../Models/VacationModel";

interface DestinationInputProps {
  register: ReturnType<typeof useForm<VacationModel>>["register"];
  errors: ReturnType<typeof useFormState<VacationModel>>["errors"];
}
function DestinationInput({
  register,
  errors,
}: DestinationInputProps): JSX.Element {
  return (
    <div className="destination-textarea-container">
      {errors.destination && (
        <p className="error active">{errors?.destination.message}</p>
      )}
      <FormLabel>Destination</FormLabel>
      <Input
        style={{ width: "100%" }}
        autoFocus
        {...register("destination", VacationModel.destinationValidation)}
      />
    </div>
  );
}

export default DestinationInput;
