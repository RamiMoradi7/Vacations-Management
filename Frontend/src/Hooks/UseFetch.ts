import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { AppState } from "../Redux/AppState";
import { vacationsService } from "../Services/VacationsService";
import { notify } from "../Utils/Notify";

function useFetchVacations() {
  const currentUser = useSelector((appState: AppState) => appState.user);
  const vacations = useSelector((appState: AppState) => appState.vacations);
  const [loading, setLoading] = useState<boolean>(false);

  useEffect(() => {
    setLoading(true);
    vacationsService
      .getVacations(currentUser.id)
      .then(() => {
        setLoading(false);
      })
      .catch((err) => {
        notify.error(err);
        setLoading(false);
      });
  }, [currentUser.id, vacations]);

  return { vacations, loading, currentUser };
}

export default useFetchVacations;
