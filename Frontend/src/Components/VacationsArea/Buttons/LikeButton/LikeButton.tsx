import { Favorite, FavoriteBorderOutlined } from "@mui/icons-material";
import { LikeModel } from "../../../../Models/LikeModel";
import { likesService } from "../../../../Services/LikesService";
import { notify } from "../../../../Utils/Notify";
import IconButton from "@mui/joy/IconButton";
import { Badge } from "@mui/material";
import "./LikeButton.css";

interface LikeButtonProps {
  isLiked: boolean;
  likesCount: number;
  vacationId: number;
  userId: number;
}
function LikeButton({
  isLiked,
  likesCount,
  vacationId,
  userId,
}: LikeButtonProps) {
  const handleLike = async (like: LikeModel) => {
    try {
      await likesService.toggleVacation(like, isLiked);
    } catch (err: any) {
      notify.error(err);
    }
  };
  const renderLikeIcon = () => {
    return isLiked === false ? (
      <Favorite style={{ color: "red" }} />
    ) : (
      <FavoriteBorderOutlined style={{ color: "black" }} />
    );
  };
  return (
    <div
      className="LikeOverlay"
      onClick={() => handleLike({ vacationId, userId })}
    >
      <IconButton size="sm" variant="plain" color="neutral">
        <Badge badgeContent={likesCount}>{renderLikeIcon()}</Badge>
      </IconButton>
    </div>
  );
}

export default LikeButton;
