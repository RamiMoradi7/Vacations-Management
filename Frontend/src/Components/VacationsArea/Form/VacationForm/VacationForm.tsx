import { ArrowBackIosNewRounded } from "@mui/icons-material";
import { Button, Typography } from "@mui/joy";
import { useEffect } from "react";
import { useForm } from "react-hook-form";
import {
  useEndDateChange,
  useImageChange,
  useStartDateChange,
} from "../../../../Hooks/FormUtils";

import { NavLink } from "react-router-dom";
import { formatDateForm } from "../../../../Hooks/FormatDates";
import { VacationModel } from "../../../../Models/VacationModel";
import { notify } from "../../../../Utils/Notify";
import DateInput from "../Inputs/DateInput/DateInput";
import DescriptionInput from "../Inputs/DescriptionInput/DescriptionInput";
import DestinationInput from "../Inputs/DestinationInput/DestinationInput";
import ImageInput from "../Inputs/ImageInput/ImageInput";
import PriceInput from "../Inputs/PriceInput/PriceInput";
import "./VacationForm.css";

type VacationFormProps = {
  onSubmit: (vacation: VacationModel) => Promise<void>;
  currentVacation?: VacationModel;
};
function VacationForm({
  onSubmit,
  currentVacation,
}: VacationFormProps): JSX.Element {
  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
    reset,
  } = useForm<VacationModel>();
  const { imageUrl, handleImageChange, setImageUrl, imageFile, resetImage } =
    useImageChange();
  const { startDate, handleStartDateChange } = useStartDateChange();
  const { handleEndDateChange } = useEndDateChange();

  useEffect(() => {
    if (currentVacation) {
      setValue("destination", currentVacation.destination);
      setValue("description", currentVacation.description);
      setValue("price", currentVacation.price);
      setValue("image", currentVacation.image);
      setValue("startDate", formatDateForm(currentVacation.startDate));
      setValue("endDate", formatDateForm(currentVacation.endDate));
      setImageUrl(currentVacation.imageUrl);
    }
  }, [currentVacation]);

  async function handleFormSubmit(vacation: VacationModel) {
    try {
      vacation.image = imageFile;
      await onSubmit(vacation);
    } catch (err: any) {
      notify.error(err);
    }
  }

  return (
    <div>
      <div className="overlay"></div>
      <div className="FormContainer">
        <form className="FormControl" onSubmit={handleSubmit(handleFormSubmit)}>
          <NavLink to={"/vacations"} className="BackLink">
            <ArrowBackIosNewRounded />
          </NavLink>
          <Typography component="h1" variant="plain">
            {currentVacation
              ? `Updating ${currentVacation.destination}`
              : "Add Vacation"}
          </Typography>
          <DestinationInput register={register} errors={errors} />
          <DescriptionInput register={register} errors={errors} />
          <DateInput
            register={register}
            errors={errors}
            onChange={handleStartDateChange}
            registerName="startDate"
            label="Start Date"
            min={
              currentVacation ? null : new Date().toISOString().split("T")[0]
            }
          />
          <DateInput
            register={register}
            onChange={handleEndDateChange}
            errors={errors}
            registerName="endDate"
            label="End Date"
            min={startDate}
            disabled={!startDate}
          />
          <PriceInput register={register} errors={errors} />
          <ImageInput
            register={register}
            errors={errors}
            onChange={handleImageChange}
            imageUrl={imageUrl}
            required={!currentVacation}
          />
          <Button type="submit" className="AddButton">
            {currentVacation ? "Update" : "Add"}
          </Button>
          <Button
            type="reset"
            onClick={() => {
              resetImage();
              reset();
            }}
          >
            Reset
          </Button>
        </form>
      </div>
    </div>
  );
}

export default VacationForm;
