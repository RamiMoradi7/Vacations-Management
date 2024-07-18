import { useEffect, useState } from "react";
import { filterVacations } from "../../../Hooks/FilterVacations";
import useFetchVacations from "../../../Hooks/UseFetch";
import useTitle from "../../../Hooks/UseTitle";
import FilterButtons from "../Buttons/FilterButtons/FilterButtons";
import PaginationComponent from "../Pagination/Pagination";
import VacationCard from "../VacationCard/VacationCard";
import "./VacationList.css";
import { CalculatePages } from "../../../Hooks/CalculatePages";
import Loader from "../../LayoutArea/Loader/Loader";

function VacationList(): JSX.Element {
  useTitle("Vacations");
  const [filter, setFilter] = useState<string | null>("");
  const { vacations, loading, currentUser } = useFetchVacations();
  const [currentPage, setCurrentPage] = useState<number>(1);
  const vacationsPerPage = 9;

  useEffect(() => {
    setCurrentPage(1);
  }, [filter]);

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
    document.getElementById("topOfPage").scrollIntoView({ behavior: "smooth" });
  };
  const isAdmin = currentUser.roleId === 1;

  if (loading) {
    return <Loader />;
  }
  const filteredVacations = filterVacations({ vacations, filter });
  const { currentVacations, totalPages } = CalculatePages({
    vacations,
    filteredVacations,
    currentPage,
    vacationsPerPage,
  });

  return (
    <>
      <div id="topOfPage" />
      <div className="VacationList">
        <FilterButtons
          filterValue={filter}
          setFilter={setFilter}
          isAdmin={isAdmin}
        />
        <div>
          <div className="Cards">
            {currentVacations.length === 0 ? (
              <div className="NoResults">
                Oops! No vacations found matching your filter criteria.
              </div>
            ) : (
              currentVacations.map((v) => (
                <VacationCard key={v.id} vacation={v} />
              ))
            )}
          </div>
        </div>
        <div className="PaginationContainer">
          <PaginationComponent
            totalPages={totalPages}
            currentPage={currentPage}
            onPageChange={handlePageChange}
          />
        </div>
      </div>
    </>
  );
}
export default VacationList;
