import { ToggleButton, ToggleButtonGroup } from "@mui/material";
import "./FilterButtons.css";
interface FilterButtonProps {
  filterValue: string | null;
  setFilter: (filter: string) => void;
  isAdmin: boolean;
}
function FilterButtons({ filterValue, setFilter, isAdmin }: FilterButtonProps) {
  const handleFilterChange = (
    event: React.MouseEvent<HTMLElement>,
    newValue: string | null
  ) => {
    if (newValue !== null) {
      setFilter(newValue);
    }
  };
  return (
    <div className="Filter">
      <ToggleButtonGroup
        value={filterValue}
        exclusive
        aria-label="Platform"
        onChange={handleFilterChange}
      >
        <ToggleButton value="All">All</ToggleButton>
        {!isAdmin && (
          <ToggleButton value="MyFavorites">My Favorites</ToggleButton>
        )}
        <ToggleButton value="CurrentActive">Current Active</ToggleButton>
        <ToggleButton value="ComingSoon">Coming Soon</ToggleButton>
      </ToggleButtonGroup>
    </div>
  );
}

export default FilterButtons;
