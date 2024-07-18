import { BarChart } from "@mui/x-charts/BarChart";
import { NavLink } from "react-router-dom";
import useFetchVacations from "../../../Hooks/UseFetch";
import "./Reports.css";
import useTitle from "../../../Hooks/UseTitle";
import { ArrowBackSharp } from "@mui/icons-material";
import VacationsCSV from "../VacationsCSV/VacationsCSV";

export default function AdminChart() {
  useTitle("Reports");
  const { vacations } = useFetchVacations();

  if (!vacations.length) {
    return <div>No data available</div>;
  }

  const vacationsData = vacations.map((v) => ({
    destination: v.destination,
    likesCount: v.likesCount || 0,
  }));
  const destinations = vacationsData.map((vacation) => vacation.destination);
  const dataSeries = destinations.map((d) => ({
    destination: d,
    likesCount:
      vacationsData.find((vacation) => vacation.destination === d)
        ?.likesCount || 0,
  }));
  const seriesData = dataSeries.map((d) => d.likesCount);
  const xAxis = [{ scaleType: "band" as const, data: destinations }];

  return (
    <div className="reports-container">
      <NavLink to={"/vacations"} className="back-link">
        <ArrowBackSharp sx={{ color: "#333" }} aria-description="Back" />
      </NavLink>
      <h2>Reports</h2>
      <div className="chart">
        <BarChart
          xAxis={xAxis}
          series={[{ data: seriesData }]}
          layout="vertical"
          colors={["#666"]}
        />
      </div>
      <VacationsCSV vacations={vacations} />
    </div>
  );
}
