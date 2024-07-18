import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { VacationModel } from "../../../../Models/VacationModel";
import { vacationsService } from "../../../../Services/VacationsService";
import { notify } from "../../../../Utils/Notify";
import VacationForm from "../VacationForm/VacationForm";
import "./EditVacation";
import useTitle from "../../../../Hooks/UseTitle";
function EditVacation() {
  const navigate = useNavigate();
  const params = useParams();
  const [vacation, setVacation] = useState<VacationModel | null>(null);
  useTitle("Edit Vacation");
  useEffect(() => {
    vacationsService
      .getOneVacation(+params.id)
      .then((vacation) => {
        setVacation(vacation);
      })
      .catch((err: any) => notify.error(err));
  });

  async function edit(vacation: VacationModel) {
    try {
      vacation.id = +params.id;
      await vacationsService.updateVacation(vacation);
      notify.success("Vacation has been updated successfully.");
      navigate("/vacations");
    } catch (err: any) {
      notify.error(err);
    }
  }

  return <VacationForm onSubmit={edit} currentVacation={vacation} />;
}

export default EditVacation;
