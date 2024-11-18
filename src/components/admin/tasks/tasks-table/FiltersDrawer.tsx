"use client";

import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetDescription,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { SlidersHorizontal } from "lucide-react";
import FiltersForm from "./FiltersForm";
import LoadingButton from "@/components/core/LoadingButton";
import { useState } from "react";
import { T_FilterSchema } from "@/lib/schemas";
import { useDataTable } from "@/providers/DataTableProvider";

const FiltersDrawer = () => {
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const { setColumnFilters } = useDataTable();

  const handleFiltersSubmit = (values: T_FilterSchema) => {
    setColumnFilters([{ id: "title", value: values.title || "" }]);
    setIsDrawerOpen(false);
  };

  return (
    <Sheet open={isDrawerOpen} onOpenChange={(state) => setIsDrawerOpen(state)}>
      <SheetTrigger asChild>
        <Button>
          <span>Filters</span>
          <SlidersHorizontal />
        </Button>
      </SheetTrigger>
      <SheetContent>
        <SheetHeader>
          <SheetTitle>Filters</SheetTitle>
          <SheetDescription>You can apply filters from here.</SheetDescription>
        </SheetHeader>
        <FiltersForm onSubmit={handleFiltersSubmit} />
        <SheetFooter>
          <SheetClose asChild>
            <LoadingButton
              type="submit"
              form="filter-form"
              text="Apply Filters"
              loadingText="Applying filters"
            />
          </SheetClose>
        </SheetFooter>
      </SheetContent>
    </Sheet>
  );
};

export default FiltersDrawer;
