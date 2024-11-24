"use client";
import React, { createContext, useContext, useState } from "react";
import { SortingState, ColumnFiltersState } from "@tanstack/react-table";

interface DataTableContextProps<TData> {
  sorting: SortingState;
  setSorting: React.Dispatch<React.SetStateAction<SortingState>>;
  columnFilters: ColumnFiltersState;
  setColumnFilters: React.Dispatch<React.SetStateAction<ColumnFiltersState>>;
  globalFilter: string;
  setGlobalFilter: React.Dispatch<React.SetStateAction<string>>;
  searchableColumns?: SearchableColumn<TData>[];
}

const DataTableContext = createContext<DataTableContextProps<any> | undefined>(
  undefined
);

interface DataTableProviderProps<TData> {
  children: React.ReactNode;
  searchableColumns?: SearchableColumn<TData>[];
}

export const DataTableProvider = <TData,>({
  children,
  searchableColumns,
}: DataTableProviderProps<TData>) => {
  const [sorting, setSorting] = useState<SortingState>([]);
  const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([]);
  const [globalFilter, setGlobalFilter] = useState("");

  return (
    <DataTableContext.Provider
      value={{
        sorting,
        setSorting,
        columnFilters,
        setColumnFilters,
        globalFilter,
        setGlobalFilter,
        searchableColumns,
      }}
    >
      {children}
    </DataTableContext.Provider>
  );
};

export const useDataTable = <TData,>() => {
  const context = useContext<DataTableContextProps<TData> | undefined>(
    DataTableContext
  );
  if (!context) {
    throw new Error("useDataTable must be used within a DataTableProvider");
  }
  return context;
};

export type SearchableColumn<TData> = {
  key: keyof TData;
  label: string;
};
