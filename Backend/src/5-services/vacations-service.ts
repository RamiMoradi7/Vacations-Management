import { OkPacketParams } from "mysql2";
import { fileSaver } from "uploaded-file-saver";
import { appConfig } from "../2-utils/app-config";
import { dal } from "../2-utils/dal";
import { ResourceNotFoundError } from "../3-models/client-errors";
import { VacationModel } from "../3-models/vacation-model";

class VacationService {
  public async getVacations(userId: number): Promise<VacationModel[]> {
    const sql = `
    SELECT DISTINCT
    V.*,
    CONCAT('${appConfig.baseImageUrl}', imageName) AS imageUrl,
    EXISTS(SELECT * FROM likes WHERE vacationId = V.id AND userId = ?) AS isLiked,
    COUNT(L.userId) AS likesCount,
    DATE_FORMAT(V.startDate, '%Y-%m-%d') AS startDate,
    DATE_FORMAT(V.endDate, '%Y-%m-%d') AS endDate
    FROM vacations AS V
    LEFT JOIN likes AS L ON V.id = L.vacationId
    GROUP BY V.id
    ORDER BY V.startDate`;
    const vacations = await dal.execute(sql, [userId]);
    return vacations;
  }
  public async getOneVacation(id: number): Promise<VacationModel> {
    const sql = `SELECT *,CONCAT('${appConfig.baseImageUrl}', imageName)
    as imageUrl FROM vacations WHERE id = ?`;
    const vacations = await dal.execute(sql, [id]);
    const vacation = vacations[0];
    if (!vacation) throw new ResourceNotFoundError(id);
    return vacation;
  }
  public async addVacation(vacation: VacationModel): Promise<VacationModel> {
    vacation.validateInsert();
    const imageName = await fileSaver.add(vacation.image);
    const sql = `INSERT INTO vacations (
      destination
      ,description
      ,startDate
      ,endDate,
      price,imageName)
    VALUES(?,?,?,?,?,?)
    `;
    const values = [
      vacation.destination,
      vacation.description,
      vacation.startDate,
      vacation.endDate,
      vacation.price,
      imageName,
    ];
    const info: OkPacketParams = await dal.execute(sql, values);
    const newVacation = await this.getOneVacation(info.insertId);
    return newVacation;
  }

  public async updateVacation(vacation: VacationModel): Promise<VacationModel> {
    vacation.validateUpdate();
    const oldImageName = await this.getImageName(vacation.id);
    const newImageName = vacation.image
      ? await fileSaver.update(oldImageName, vacation.image)
      : oldImageName;
    const sql =
      "UPDATE vacations SET destination=? , description=? , startDate=? , endDate=?, price=?,imageName= ? WHERE id=?";
    const values = [
      vacation.destination,
      vacation.description,
      vacation.startDate,
      vacation.endDate,
      vacation.price,
      newImageName,
      vacation.id,
    ];

    const info: OkPacketParams = await dal.execute(sql, values);
    if (info.affectedRows === 0) throw new ResourceNotFoundError(vacation.id);
    vacation = await this.getOneVacation(vacation.id);
    return vacation;
  }
  public async deleteVacation(id: number): Promise<void> {
    const existingVacation = await this.getOneVacation(id);
    if (!existingVacation) throw new ResourceNotFoundError(id);
    const imageName = await this.getImageName(id);
    const sql = "DELETE FROM vacations WHERE id = ?";
    const info: OkPacketParams = await dal.execute(sql, [id]);
    if (info.affectedRows === 0) throw new ResourceNotFoundError(id);
    await fileSaver.delete(imageName);
  }

  private async getImageName(id: number): Promise<string> {
    const sql = "SELECT imageName from vacations where id = ?";
    const vacations = await dal.execute(sql, [id]);
    const vacation = vacations[0];
    const imageName = vacation.imageName;
    return imageName;
  }
}

export const vacationService = new VacationService();
