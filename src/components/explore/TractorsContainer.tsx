"use client";
import React from "react";
import kyInstance from "@/lib/ky";
import {
  T_TractorSellerAttachmentEquipmentDataInclude,
  TractorsPage,
} from "@/lib/types";
import { urls } from "@/lib/urls";
import { Tractor } from "@prisma/client";
import { useInfiniteQuery } from "@tanstack/react-query";
import InfiniteScrollContainer from "../core/InfiniteScrollContainer";
import Loader from "../ui/Loader";
// import TasksContainerLoadingSkeleton from "./TasksContainerLoadingSkeleton";
import { QUERY_KEYS } from "@/lib/constants";
import { Button } from "../ui/button";
import { useRouter } from "next/navigation";
// import TaskActionsDropdown from "./TaskActionsDropdown";

const TasksContainer = () => {
  const {
    data,
    status,
    fetchNextPage,
    hasNextPage,
    isFetching,
    isFetchingNextPage,
  } = useInfiniteQuery({
    queryKey: [QUERY_KEYS.tasks],
    queryFn: ({ pageParam }) =>
      kyInstance
        .get(
          urls.API_TRACTORS,
          pageParam ? { searchParams: { cursor: pageParam } } : {}
        )
        .json<TractorsPage>(),
    initialPageParam: null as string | null,
    getNextPageParam: (lastPage) => lastPage.nextCursor,
  });

  if (status === "pending") {
    return <p>Loading ...</p>;
    // return <TasksContainerLoadingSkeleton />;
  }

  if (status === "error") {
    return <p>An error occurred while loading tractors.</p>;
  }

  const tractors = data?.pages.flatMap((page) => page.tractors) || [];

  if (status === "success" && !tractors.length && !hasNextPage) {
    return <p>No tractors</p>;
  }

  return (
    <InfiniteScrollContainer
      onBottomReached={() => hasNextPage && !isFetching && fetchNextPage()}
    >
      {tractors.map((tractor) => (
        <TractorCard key={tractor.id} tractor={tractor} />
      ))}

      {isFetchingNextPage && <Loader className="my-4" />}

      {!hasNextPage && <p>You have reached the end</p>}
    </InfiniteScrollContainer>
  );
};

interface TractorProps {
  tractor: T_TractorSellerAttachmentEquipmentDataInclude;
}

const TractorCard: React.FC<TractorProps> = ({ tractor }) => {
  const router = useRouter();

  const handleContactSellerOnClick = () => {
    router.push("/inbox");
  };

  return (
    <div className="group/task">
      <p>{tractor.equipment.seller?.profile.firstName}</p>
      <p>{tractor.equipment.seller?.profile.lastName}</p>
      <p>{tractor.equipment.seller?.businessName}</p>
      <p>{tractor.equipment.name}</p>
      <p>{tractor.equipment.description}</p>
      <p>{tractor.equipment.price}</p>
      <p>{tractor.equipment.condition}</p>
      <p>{tractor.fuelCapacity}</p>
      <p>{tractor.mileage}</p>
      <Button onClick={handleContactSellerOnClick}>Contact Seller</Button>
    </div>
  );
};

export default TasksContainer;
