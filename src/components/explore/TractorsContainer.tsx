"use client";
import React from "react";
import kyInstance from "@/lib/ky";
import { TractorsPage } from "@/lib/types";
import { urls } from "@/lib/urls";
import { useInfiniteQuery } from "@tanstack/react-query";
import InfiniteScrollContainer from "../core/InfiniteScrollContainer";
import Loader from "../ui/Loader";
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
    queryKey: [QUERY_KEYS.tractors],
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
    return <div className="flex justify-center items-center space-x-2 w-full h-screen">
    <div className="w-4 h-4 bg-primary rounded-full animate-pulse"></div>
    <div className="w-4 h-4 bg-primary rounded-full animate-pulse"></div>
    <div className="w-4 h-4 bg-primary rounded-full animate-pulse"></div>
  </div>
  
  
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
      className="p-4 "
      onBottomReached={() => hasNextPage && !isFetching && fetchNextPage()}
    >
      <div className="grid grid-cols-5 ">
      {tractors.map((tractor) => (
        <TractorCard key={tractor.id} tractor={tractor} />
      ))}

      {isFetchingNextPage && <Loader className="my-4" />}

      </div>
      {!hasNextPage && <p className="text-center">You have reached the end of the page</p>}
    </InfiniteScrollContainer>
  );
};

export default TractorsContainer;
