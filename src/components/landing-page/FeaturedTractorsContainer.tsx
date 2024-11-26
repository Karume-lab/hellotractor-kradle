"use client";
import React from "react";
import kyInstance from "@/lib/ky";
import { TractorsPage } from "@/lib/types";
import { urls } from "@/lib/urls";
import { useInfiniteQuery } from "@tanstack/react-query";
import InfiniteScrollContainer from "../core/InfiniteScrollContainer";
import Loader from "../ui/Loader";
// import TasksContainerLoadingSkeleton from "./TasksContainerLoadingSkeleton";
import { QUERY_KEYS } from "@/lib/constants";
import Image from "next/image";
import { formatPrice } from "@/lib/utils";
import { Button } from "../ui/button";

const FeaturedTractorsContainer = () => {
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
      className="flex"
      onBottomReached={() => hasNextPage && !isFetching && fetchNextPage()}
    >
      {tractors.map((tractor) => (
        <div className="rounded-lg border bg-card text-card-foreground shadow-sm p-2 flex flex-col relative w-80 ">
          <Image
            src={"/img/Core/tractors/tractor1.png"}
            alt="tractor"
            width={200}
            height={200}
            className="border w-full"
          />
          <span className="absolute top-4 right-4 bg-pink-600 text-xs  rounded-2xl p-2 text-primary ">
            {tractor.equipment.condition}
          </span>
          <div className="flex justify-between mt-2">
            <span className="text-2xl font-bold text-primary">
              {tractor.equipment.name}
            </span>
          </div>
          <span className="text-xs uppercase text-muted-foreground">
            Nairobi, Kenya
          </span>

          <div className="flex flex-col my-4">
            <span>{tractor.fuelCapacity}</span>
            <span>{tractor.mileage}</span>
          </div>

          <p className="text-2xl text-green-500 font-bold text-primary">
            {formatPrice(tractor.equipment.price)}
          </p>

          <div className="flex justify-between gap-2 ">
            <Button className="grow" variant={"outline"}>
              Details
            </Button>
          </div>
        </div>
      ))}

      {isFetchingNextPage && <Loader className="my-4" />}

      {/* {!hasNextPage && <p>You have reached the end</p>} */}
    </InfiniteScrollContainer>
  );
};

export default FeaturedTractorsContainer;
