"use client";
import kyInstance from "@/lib/ky";
import { urls } from "@/lib/urls";
import { useInfiniteQuery } from "@tanstack/react-query";
import React, { useState } from "react";
import { PAGE_SIZE, QUERY_KEYS } from "@/lib/constants";
import { DataTable } from "@/components/core/DataTable";
import { DataTableProvider } from "@/providers/DataTableProvider";
import { ColumnDef } from "@tanstack/react-table";
import { T_DealerDataInclude, DealersPage } from "@/lib/types";
import { Dealer } from "@prisma/client";

const columns: ColumnDef<Dealer & T_DealerDataInclude>[] = [
  {
    accessorKey: "name",
    header: "Dealer Name",
  },
];

const DealersTable = () => {
  const [currentPage, setCurrentPage] = useState(1);

  const {
    data,
    status,
    fetchNextPage,
    hasNextPage,
    isFetching,
    isFetchingNextPage,
  } = useInfiniteQuery({
    queryKey: [QUERY_KEYS.dealers],
    queryFn: ({ pageParam }) =>
      kyInstance
        .get(
          urls.API_DEALERS,
          pageParam ? { searchParams: { cursor: pageParam } } : {}
        )
        .json<DealersPage>(),
    initialPageParam: null as string | null,
    getNextPageParam: (lastPage) => lastPage.nextCursor,
  });

  const dealers = data?.pages.flatMap((page) => page.dealers) || [];
  const totalItems = dealers.length + (hasNextPage ? PAGE_SIZE : 0);
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
    return dealers.slice(start, end);
  };

  type SearchableColumn = {
    key: keyof T_DealerDataInclude | "name";
    label: string;
  };

  const searchableColumns: SearchableColumn[] = [
    { key: "name", label: "Dealer Name" },
  ];

  if (status === "pending") {
    return (
      <div className="flex justify-center items-center min-h-[200px]">
        <div className="text-gray-500">Loading dealers...</div>
      </div>
    );
  }

  if (status === "error") {
    return (
      <div className="flex justify-center items-center min-h-[200px]">
        <div className="text-red-500">Error loading dealers</div>
      </div>
    );
  }

  return (
    <DataTableProvider searchableColumns={searchableColumns}>
      <div className="space-y-4">
        <DataTable
          data={getCurrentPageData()}
          columns={columns as any}
          noun="dealers"
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

export default DealersTable;
