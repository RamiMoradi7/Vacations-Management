import { DeleteOutlineSharp } from "@mui/icons-material";
import { useNavigate } from "react-router-dom";
import { vacationsService } from "../../../../Services/VacationsService";
import { notify } from "../../../../Utils/Notify";
import "./DeleteButton.css";
interface DeleteButtonProps {
  vacationId: number;
  destination: string;
}

function DeleteButton({ vacationId, destination }: DeleteButtonProps) {
  const navigate = useNavigate();

  const deleteVacation = async (vacationId: number) => {
    try {
      const sure = window.confirm(`Your'e about to delete ${destination}`);
      if (!sure) return;
      await vacationsService.deleteVacation(vacationId);
      navigate("/vacations");
    } catch (err: any) {
      notify.error(err);
    }
  };

  return (
    <div className="DeleteOverlay" onClick={() => deleteVacation(vacationId)}>
      <DeleteOutlineSharp sx={{ color: "#d50000" }} />
    </div>
  );
}

export default DeleteButton;
