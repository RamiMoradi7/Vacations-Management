import { VacationModel } from "../Models/VacationModel";

interface CalculatePagesProps {
  vacations: VacationModel[];
  filteredVacations: VacationModel[];
  currentPage: number;
  vacationsPerPage: number;
}
export function CalculatePages({
  filteredVacations,
  vacations,
  currentPage,
  vacationsPerPage,
}: CalculatePagesProps) {
  const startIndex = (currentPage - 1) * vacationsPerPage;
  const endIndex = Math.min(startIndex + vacationsPerPage, vacations.length);
  const currentVacations = filteredVacations.slice(startIndex, endIndex);
  const totalPages = Math.ceil(filteredVacations.length / vacationsPerPage);
  return { currentVacations, totalPages };
}
