import { Edit } from "@mui/icons-material";
import { useNavigate } from "react-router-dom";
import "./EditButton.css";
interface EditButtonProps {
  vacationId: number;
}

function EditButton({ vacationId }: EditButtonProps) {
  const navigate = useNavigate();
  return (
    <div
      className="EditOverlay"
      onClick={() => navigate(`/vacations/edit/${vacationId}`)}
    >
      <Edit />
    </div>
  );
}

export default EditButton;
