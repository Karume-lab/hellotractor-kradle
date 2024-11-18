import React from "react";
import { Input } from "@/components/ui/input";
import { useDataTable } from "@/providers/DataTableProvider";

const SearchInput = () => {
  const { globalFilter, setGlobalFilter, searchableColumns } = useDataTable();

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setGlobalFilter(e.target.value);
  };

  return (
    <Input
      value={globalFilter}
      onChange={handleSearchChange}
      placeholder={`Search across ${searchableColumns
        ?.map((col) => col.label)
        .join(", ")}`}
      className="lg:w-3/5"
    />
  );
};

export default SearchInput;
