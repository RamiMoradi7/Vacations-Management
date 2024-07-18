import { FormLabel } from "@mui/joy";
import { useForm, useFormState } from "react-hook-form";
import { VacationModel } from "../../../../../Models/VacationModel";
import "./DescriptionInput.css";

interface DescriptionInputProps {
  register: ReturnType<typeof useForm<VacationModel>>["register"];
  errors: ReturnType<typeof useFormState<VacationModel>>["errors"];
}

function DescriptionInput({
  register,
  errors,
}: DescriptionInputProps): JSX.Element {
  return (
    <div className="textarea-container">
      {errors.description && (
        <p className="error active">{errors?.description.message}</p>
      )}
      <FormLabel>Description</FormLabel>
      <textarea
        className="textarea"
        {...register("description", VacationModel.descriptionValidation)}
      />
    </div>
  );
}

export default DescriptionInput;
