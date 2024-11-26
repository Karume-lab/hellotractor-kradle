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
import TractorCard from "./TractorCard";

const TractorsContainer = () => {
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
        <TractorCard key={tractor.id} tractor={tractor} />
      ))}

      {isFetchingNextPage && <Loader className="my-4" />}

      {!hasNextPage && <p>You have reached the end</p>}
    </InfiniteScrollContainer>
  );
};

export default TractorsContainer;
