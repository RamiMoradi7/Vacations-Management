import { useNavigate } from "react-router-dom";
import { VacationModel } from "../../../../Models/VacationModel";
import { vacationsService } from "../../../../Services/VacationsService";
import { notify } from "../../../../Utils/Notify";
import VacationForm from "../VacationForm/VacationForm";
import useTitle from "../../../../Hooks/UseTitle";

function AddVacation() {
  useTitle("Add Vacation");
  const navigate = useNavigate();
  async function addVacation(vacation: VacationModel) {
    try {
      await vacationsService.addVacation(vacation);
      notify.success("Vacation has been added successfully.");
      navigate("/vacations");
    } catch (err: any) {
      notify.error(err);
    }
  }

  return <VacationForm onSubmit={addVacation} />;
}

export default AddVacation;
