"use client";
import kyInstance from "@/lib/ky";
import { urls } from "@/lib/urls";
import { useInfiniteQuery } from "@tanstack/react-query";
import React, { useState } from "react";
import { PAGE_SIZE, QUERY_KEYS } from "@/lib/constants";
import { DataTable } from "@/components/core/DataTable";
import { DataTableProvider } from "@/providers/DataTableProvider";
import { ColumnDef } from "@tanstack/react-table";
import { Badge } from "@/components/ui/badge";
import {
  T_TrainedOperatorDataInclude,
  TrainedOperatorsPage,
} from "@/lib/types";
import { TrainedOperator } from "@prisma/client";

const columns: ColumnDef<TrainedOperator & T_TrainedOperatorDataInclude>[] = [
  {
    accessorKey: "displayName",
    header: "Display Name",
    cell: ({ row }) =>
      row.original.displayName ||
      `${row.original.firstName} ${row.original.lastName}`,
  },
  {
    accessorKey: "firstName",
    header: "First Name",
  },
  {
    accessorKey: "lastName",
    header: "Last Name",
  },
  {
    accessorKey: "isVerified",
    header: "Status",
    cell: ({ row }) => (
      <Badge variant={row.original.isVerified ? "default" : "secondary"}>
        {row.original.isVerified ? "Verified" : "Unverified"}
      </Badge>
    ),
  },
];

const TrainedOperatorsTable = () => {
  const [currentPage, setCurrentPage] = useState(1);

  const {
    data,
    status,
    fetchNextPage,
    hasNextPage,
    isFetching,
    isFetchingNextPage,
  } = useInfiniteQuery({
    queryKey: [QUERY_KEYS.trainedOperators],
    queryFn: ({ pageParam }) =>
      kyInstance
        .get(
          urls.API_TRAINED_OPERATORS,
          pageParam ? { searchParams: { cursor: pageParam } } : {}
        )
        .json<TrainedOperatorsPage>(),
    initialPageParam: null as string | null,
    getNextPageParam: (lastPage) => lastPage.nextCursor,
  });

  const trainedOperators =
    data?.pages.flatMap((page) => page.trainedOperators) || [];
  const totalItems = trainedOperators.length + (hasNextPage ? PAGE_SIZE : 0);
  const totalPages = Math.ceil(totalItems / PAGE_SIZE);

  const handlePageChange = async (newPage: number) => {
    const pagesNeeded =
      Math.ceil((newPage * PAGE_SIZE) / PAGE_SIZE) - data?.pages.length!;
    if (pagesNeeded > 0 && hasNextPage) {
      for (let i = 0; i < pagesNeeded && hasNextPage; i++) {
        await fetchNextPage();
      }
    }
    setCurrentPage(newPage);
  };

  const getCurrentPageData = () => {
    const start = (currentPage - 1) * PAGE_SIZE;
    const end = start + PAGE_SIZE;
    return trainedOperators.slice(start, end);
  };

  type SearchableColumn = {
    key:
      | keyof T_TrainedOperatorDataInclude
      | "firstName"
      | "lastName"
      | "displayName";
    label: string;
  };

  const searchableColumns: SearchableColumn[] = [
    { key: "firstName", label: "First Name" },
    { key: "lastName", label: "Last Name" },
    { key: "displayName", label: "Display Name" },
  ];

  if (status === "pending") {
    return (
      <div className="flex justify-center items-center min-h-[200px]">
        <div className="text-gray-500">Loading trained operators...</div>
      </div>
    );
  }

  if (status === "error") {
    return (
      <div className="flex justify-center items-center min-h-[200px]">
        <div className="text-red-500">Error loading trained operators</div>
      </div>
    );
  }

  return (
    <DataTableProvider searchableColumns={searchableColumns}>
      <div className="space-y-4">
        <DataTable
          data={getCurrentPageData()}
          columns={columns as any}
          noun="trained operators"
          hasNextPage={hasNextPage}
          isFetching={isFetching}
          isLoadingMore={isFetchingNextPage}
          currentPage={currentPage}
          totalPages={totalPages}
          onPageChange={handlePageChange}
        />
      </div>
    </DataTableProvider>
  );
};

export default TrainedOperatorsTable;
