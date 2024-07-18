import Pagination from "@mui/material/Pagination";
import "./Pagination.css";
interface PaginationProps {
  totalPages: number;
  currentPage: number;
  onPageChange: (page: number) => void;
}

function PaginationComponent({
  totalPages,
  currentPage,
  onPageChange,
}: PaginationProps): JSX.Element {
  const handlePageChange = (
    event: React.ChangeEvent<unknown>,
    page: number
  ) => {
    onPageChange(page);
  };

  return (
    <div className="PaginationContainer">
      <Pagination
        sx={{ color: "#333" }}
        count={totalPages}
        page={currentPage}
        onChange={handlePageChange}
      />
    </div>
  );
}

export default PaginationComponent;
