import React from "react";
import SearchInput from "./SearchInput";
import LayoutSwitch from "./LayoutSwitch";
import Filters from "./Filters";
import ClearFiltersSearch from "./ClearFiltersSearch";

const FilterHeading = () => {
  return (
    <div className="flex justify-between items-center">
      <SearchInput />
      <div className="flex gap-x-4">
        <LayoutSwitch />
        <Filters />
        <ClearFiltersSearch />
      </div>
    </div>
  );
};

export default FilterHeading;
