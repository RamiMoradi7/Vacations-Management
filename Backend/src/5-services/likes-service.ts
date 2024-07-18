import { OkPacketParams } from "mysql2";
import { dal } from "../2-utils/dal";
import {
  DuplicateLikeError,
  ResourceNotFoundError,
} from "../3-models/client-errors";
import { LikeModel } from "../3-models/like-model";

class LikesService {
  public async likeVacation({ userId, vacationId }: LikeModel): Promise<void> {
    try {
      const sql = "INSERT INTO likes (userId, vacationId) VALUES (?, ?)";
      await dal.execute(sql, [userId, vacationId]);
    } catch (error: any) {
      switch (error.code) {
        case "ER_NO_REFERENCED_ROW":
        case "ER_NO_REFERENCED_ROW_2":
          throw new ResourceNotFoundError(vacationId);
        case "ER_DUP_ENTRY":
          throw new DuplicateLikeError(vacationId);
        default:
          throw error;
      }
    }
  }
  public async unlikeVacation({
    userId,
    vacationId,
  }: LikeModel): Promise<void> {
    const sql = "DELETE FROM likes WHERE userId = ? AND vacationId = ?";
    const info: OkPacketParams = await dal.execute(sql, [userId, vacationId]);
    if (info.affectedRows === 0) throw new ResourceNotFoundError(vacationId);
  }
}

export const likesService = new LikesService();
