import axios from "axios";
import { LikeModel } from "../Models/LikeModel";
import { appStore } from "../Redux/Store";
import { vacationActions } from "../Redux/VacationsSlice";
import { appConfig } from "../Utils/AppConfig";

class LikesService {
  public async toggleVacation(like: LikeModel, isLike: boolean): Promise<void> {
    const axiosMethod = isLike ? axios.post : axios.delete;
    await axiosMethod(
      `${appConfig.vacationLikeUrl}${like.userId}/${like.vacationId}`
    );
    const vacation = appStore
      .getState()
      .vacations.find((v) => v.id === like.vacationId);
    const updatedVacation = {
      ...vacation,
      isLiked: isLike ? 1 : 0,
      likesCount: vacation.likesCount + (isLike ? 1 : -1),
    };
    appStore.dispatch(vacationActions.updateVacation(updatedVacation));
  }
}
export const likesService = new LikesService();
