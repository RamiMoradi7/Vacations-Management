import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { VacationModel } from "../Models/VacationModel";

function initAll(
  currentState: VacationModel[],
  action: PayloadAction<VacationModel[]>
): VacationModel[] {
  const newState = action.payload;
  return newState;
}

function addVacation(
  currentState: VacationModel[],
  action: PayloadAction<VacationModel>
): VacationModel[] {
  const newState = [...currentState, action.payload];
  newState.sort(
    (a, b) => new Date(a.startDate).getTime() - new Date(b.startDate).getTime()
  );
  return newState;
}

function updateVacation(
  currentState: VacationModel[],
  action: PayloadAction<VacationModel>
): VacationModel[] {
  const updatedVacation = action.payload;
  const newState = currentState.map((vacation) => {
    if (vacation.id === updatedVacation.id) {
      return {
        ...vacation,
        ...updatedVacation,
      };
    }
    return vacation;
  });
  if (updatedVacation.startDate || updatedVacation.endDate) {
    newState.sort(
      (a, b) =>
        new Date(a.startDate).getTime() - new Date(b.startDate).getTime()
    );
  }
  return newState;
}

function resetVacations(): VacationModel[] {
  return [];
}

function deleteVacation(
  currentState: VacationModel[],
  action: PayloadAction<number>
): VacationModel[] {
  const newState = [...currentState];
  const index = newState.findIndex(
    (vacation) => vacation.id === action.payload
  );
  if (index >= 0) newState.splice(index, 1);
  return newState;
}

const vacationSlice = createSlice({
  name: "vacations",
  initialState: [],
  reducers: {
    initAll,
    addVacation,
    updateVacation,
    resetVacations,
    deleteVacation,
  },
});

export const vacationActions = vacationSlice.actions;
export const vacationsReducers = vacationSlice.reducer;
