import axios from "axios";
import { VacationModel } from "../Models/VacationModel";
import { appStore } from "../Redux/Store";
import { vacationActions } from "../Redux/VacationsSlice";
import { appConfig } from "../Utils/AppConfig";

class VacationsService {
  public async getVacations(userId: number): Promise<VacationModel[]> {
    let vacations = appStore.getState().vacations;
    if (vacations.length > 0) return vacations;
    const response = await axios.get<VacationModel[]>(
      appConfig.vacationsUrl + userId
    );
    vacations = response.data;
    appStore.dispatch(vacationActions.initAll(vacations));
    return vacations;
  }
  public async getOneVacation(id: number): Promise<VacationModel> {
    let vacation = appStore.getState().vacations?.find((v) => v.id === id);
    if (vacation) return vacation;
    const response = await axios.get<VacationModel>(
      appConfig.oneVacationUrl + id
    );
    vacation = response.data;
    return vacation;
  }

  public async addVacation(vacation: VacationModel): Promise<void> {
    const response = await axios.post<VacationModel>(
      appConfig.vacationsUrl,
      vacation,
      appConfig.axiosOptions
    );
    const addedVacation = response.data;
    appStore.dispatch(vacationActions.addVacation(addedVacation));
  }

  public async updateVacation(vacation: VacationModel): Promise<void> {
    const response = await axios.put<VacationModel>(
      appConfig.vacationsUrl + vacation.id,
      vacation,
      appConfig.axiosOptions
    );
    const updatedVacation = response.data;
    appStore.dispatch(vacationActions.updateVacation(updatedVacation));
  }

  public async deleteVacation(id: number): Promise<void> {
    await axios.delete<VacationModel>(appConfig.vacationsUrl + id);
    appStore.dispatch(vacationActions.deleteVacation(id));
  }
}

export const vacationsService = new VacationsService();
