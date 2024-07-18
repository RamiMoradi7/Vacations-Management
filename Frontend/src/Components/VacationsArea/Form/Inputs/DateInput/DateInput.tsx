import { FormLabel } from "@mui/joy";
import { ChangeEvent, useState } from "react";
import { useForm, useFormState } from "react-hook-form";
import { VacationModel } from "../../../../../Models/VacationModel";
import { Input } from "@mui/material";

interface DateInputProps {
  register: ReturnType<typeof useForm<VacationModel>>["register"];
  errors: ReturnType<typeof useFormState<VacationModel>>["errors"];
  onChange: (event: ChangeEvent<HTMLInputElement>) => void;
  min?: string | null;
  disabled?: boolean;
  registerName: "startDate" | "endDate";
  label: string;
}

function DateInput({
  register,
  errors,
  onChange,
  min,
  disabled,
  registerName,
  label,
}: DateInputProps): JSX.Element {
  const [isDateSelected, setIsDateSelected] = useState<boolean>(false);
  const handleInputChange = async (event: ChangeEvent<HTMLInputElement>) => {
    await onChange(event);
    setIsDateSelected(true);
  };
  return (
    <div>
      {errors[registerName] && !isDateSelected && (
        <p className="error active">{errors[registerName]?.message}</p>
      )}
      <FormLabel>{label}</FormLabel>
      <Input
        type="date"
        {...register(
          registerName,
          registerName === "startDate"
            ? VacationModel.startDateValidation
            : VacationModel.endDateValidation
        )}
        onChange={handleInputChange}
        inputProps={{ min: min }}
        disabled={disabled}
      />
    </div>
  );
}

export default DateInput;
