"use client";
import kyInstance from "@/lib/ky";
import { urls } from "@/lib/urls";
import { useInfiniteQuery } from "@tanstack/react-query";
import React, { useState } from "react";
import { PAGE_SIZE, QUERY_KEYS } from "@/lib/constants";
import { DataTable } from "@/components/core/DataTable";
import { DataTableProvider } from "@/providers/DataTableProvider";
import { ColumnDef } from "@tanstack/react-table";
import { getConditionDisplay } from "@/lib/utils";
import { Badge } from "@/components/ui/badge";
import {
  AttachmentsPage,
  T_AttachmentSellerEquipmentDataInclude,
} from "@/lib/types";
import { Equipment } from "@prisma/client";

const columns: ColumnDef<Equipment & T_AttachmentSellerEquipmentDataInclude>[] =
  [
    {
      accessorKey: "equipment.name",
      header: "Name",
    },
    {
      accessorKey: "equipment.price",
      header: "Price",
    },
    {
      accessorKey: "color",
      header: "Color",
    },
    {
      accessorKey: "condition",
      header: "Condition",
      cell: ({ row }) =>
        row.original?.equipment.condition ? (
          <Badge variant="secondary">
            {getConditionDisplay(row.original.equipment.condition)}
          </Badge>
        ) : (
          "N/A"
        ),
    },
    {
      accessorKey: "seller",
      header: "Seller",
      cell: ({ row }) => {
        if (!row.original?.equipment.seller) return "N/A";
        return (
          row.original.equipment.seller.businessName ||
          `${row.original.equipment.seller.profile.firstName} ${row.original.equipment.seller.profile.lastName}`
        );
      },
    },
    {
      accessorKey: "averageRating",
      header: "Rating",
      cell: ({ row }) =>
        row.original?.equipment.averageRating
          ? `${row.original.equipment.averageRating.toFixed(1)} ★`
          : "No ratings",
    },
    {
      accessorKey: "status",
      header: "Status",
      cell: ({ row }) => (
        <Badge
          variant={row.original?.equipment.isSold ? "destructive" : "default"}
        >
          {row.original?.equipment.isSold ? "Sold" : "Available"}
        </Badge>
      ),
    },
  ];

const AttachmentsTable = () => {
  const [currentPage, setCurrentPage] = useState(1);

  const {
    data,
    status,
    fetchNextPage,
    hasNextPage,
    isFetching,
    isFetchingNextPage,
  } = useInfiniteQuery({
    queryKey: [QUERY_KEYS.attachments],
    queryFn: ({ pageParam }) =>
      kyInstance
        .get(
          urls.API_ATTACHMENTS,
          pageParam ? { searchParams: { cursor: pageParam } } : {}
        )
        .json<AttachmentsPage>(),
    initialPageParam: null as string | null,
    getNextPageParam: (lastPage) => lastPage.nextCursor,
  });

  const attachments = data?.pages.flatMap((page) => page.attachments) || [];
  const totalItems = attachments.length + (hasNextPage ? PAGE_SIZE : 0);
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
    return attachments.slice(start, end);
  };

  type SearchableColumn = {
    key:
      | keyof T_AttachmentSellerEquipmentDataInclude
      | "tractor.mileage"
      | "tractor.fuelCapacity";
    label: string;
  };

  const searchableColumns: SearchableColumn[] = [];

  if (status === "pending") {
    return (
      <div className="flex justify-center items-center min-h-[200px]">
        <div className="text-gray-500">Loading attachments...</div>
      </div>
    );
  }

  if (status === "error") {
    return (
      <div className="flex justify-center items-center min-h-[200px]">
        <div className="text-red-500">Error loading attachments</div>
      </div>
    );
  }

  return (
    <DataTableProvider searchableColumns={searchableColumns}>
      <div className="space-y-4">
        <DataTable
          data={getCurrentPageData()}
          columns={columns as any}
          noun="attachments"
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

export default AttachmentsTable;
