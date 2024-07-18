import { VacationModel } from "../Models/VacationModel";

interface FilterVacationProps {
  vacations: VacationModel[];
  filter: string;
}

export function filterVacations({
  vacations,
  filter,
}: FilterVacationProps): VacationModel[] {
  const filteredVacations = vacations.filter((v) => {
    const currentDate = new Date();
    const startDate = new Date(v.startDate);
    const endDate = new Date(v.endDate);
    switch (filter) {
      case "MyFavorites":
        return v.isLiked === 1;
      case "CurrentActive":
        return startDate <= currentDate && currentDate <= endDate;
      case "ComingSoon":
        return startDate > currentDate;
      default:
        return true;
    }
  });
  return filteredVacations;
}
