import React from "react";
import { Button } from "@mui/joy";
import { VacationModel } from "../../../Models/VacationModel";
import "./VacationsCSV.css";
import DownloadingIcon from "@mui/icons-material/Downloading";
interface VacationsCSVProps {
  vacations: VacationModel[];
}

const VacationsCSV: React.FC<VacationsCSVProps> = ({ vacations }) => {
  const convertToCSV = (
    vacationsData: { destination: string; likesCount: number }[]
  ) => {
    if (vacationsData.length === 0) return "";

    const header = "Destination,LikesCount";
    const rows = vacationsData.map(
      (vacation) => `${vacation.destination.trim()},${vacation.likesCount}`
    );
    return header + "\n" + rows.join("\n");
  };

  const handleDownloadCSV = () => {
    console.log(vacations);
    const csvContent = convertToCSV(vacations);
    const blob = new Blob([csvContent], { type: "text/csv" });
    console.log(csvContent);
    const url = URL.createObjectURL(blob);
    const downloadLink = document.createElement("a");
    downloadLink.href = url;
    downloadLink.download = "vacations.csv";
    document.body.appendChild(downloadLink);
    downloadLink.click();
    document.body.removeChild(downloadLink);

    URL.revokeObjectURL(url);
  };

  return (
    <Button className="CSVButton" onClick={handleDownloadCSV}>
      <DownloadingIcon />
      CSV
    </Button>
  );
};

export default VacationsCSV;
