"use client";

import React from "react";
import { Button } from "@/components/ui/button";
import { IoMdCloseCircleOutline } from "react-icons/io";
import { useDataTable } from "@/providers/DataTableProvider";

const ClearFiltersSearch: React.FC = () => {
  const { columnFilters, globalFilter, setColumnFilters, setGlobalFilter } =
    useDataTable();

  const hasActiveFilters = columnFilters.length > 0 || globalFilter !== "";

  const handleClearFilters = () => {
    setColumnFilters([]);
    setGlobalFilter("");
  };

  return (
    <Button
      variant="destructive"
      onClick={handleClearFilters}
      disabled={!hasActiveFilters}
    >
      <span>Clear Filters</span>
      <IoMdCloseCircleOutline />
    </Button>
  );
};

export default ClearFiltersSearch;
