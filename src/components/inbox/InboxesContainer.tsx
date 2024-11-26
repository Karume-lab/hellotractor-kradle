"use client";
import React from "react";
import kyInstance from "@/lib/ky";
import { urls } from "@/lib/urls";
import { useInfiniteQuery } from "@tanstack/react-query";
import InfiniteScrollContainer from "../core/InfiniteScrollContainer";
import Loader from "../ui/Loader";
import { QUERY_KEYS } from "@/lib/constants";
import { InboxesPage, T_InboxDataInclude } from "@/lib/types";
import InboxCard from "./InboxCard";

const InboxesContainer = () => {
  const {
    data,
    status,
    fetchNextPage,
    hasNextPage,
    isFetching,
    isFetchingNextPage,
  } = useInfiniteQuery({
    queryKey: [QUERY_KEYS.inboxes],
    queryFn: ({ pageParam }) =>
      kyInstance
        .get(urls.API_INBOXES, {
          searchParams: pageParam ? { cursor: pageParam as string } : undefined,
        })
        .json<InboxesPage>(),
    initialPageParam: null as string | null,
    getNextPageParam: (lastPage) => lastPage.nextCursor,
  });

  if (status === "pending") {
    return <Loader />;
  }

  if (status === "error") {
    return <div>An error occurred while loading inboxes.</div>;
  }

  const inboxes: T_InboxDataInclude[] =
    data?.pages.flatMap((page) => page.inboxes) || [];

  if (status === "success" && !inboxes.length && !hasNextPage) {
    return <div>No inboxes</div>;
  }

  return (
    <InfiniteScrollContainer
      className="p-4 "
      onBottomReached={() => hasNextPage && !isFetching && fetchNextPage()}
    >
      {inboxes.map((inbox) => (
        <InboxCard key={inbox.id} inbox={inbox} />
      ))}

      {isFetchingNextPage && <Loader />}

      {!hasNextPage && (
        <div className="text-center text-gray-500 mt-4">
          You have reached the end of the page
        </div>
      )}
    </InfiniteScrollContainer>
  );
};

export default InboxesContainer;
