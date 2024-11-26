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
import LinkAsButton from "../core/LinkAsButton";

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
    return <div className="flex justify-center items-center space-x-2">
    <div className="w-4 h-4 bg-primary rounded-full animate-pulse"></div>
    <div className="w-4 h-4 bg-primary rounded-full animate-pulse"></div>
    <div className="w-4 h-4 bg-primary rounded-full animate-pulse"></div>
  </div>;
  }

  if (status === "error") {
    return <div>An error occurred while loading inboxes.</div>;
  }

  const inboxes: T_InboxDataInclude[] =
    data?.pages.flatMap((page) => page.inboxes) || [];

  if (status === "success" && !inboxes.length && !hasNextPage) {
    return <div className="flex flex-col items-center h-full justify-center">
      <p className="text-2xl text-center font-semibold text-gray-700 ">Oops, you don't have any chats yet</p>
      <p className="text-center text-gray-500 mt-2">Find something interesting, and start a conversation with a seller </p>
      <LinkAsButton
        className="w-fit mx-auto mt-4"
        text="Explore"
        redirectTo={urls.EXPLORE}
        />
    </div>;
  }

  return (
    <InfiniteScrollContainer
      className="p-4 overflow-y-auto "
      onBottomReached={() => hasNextPage && !isFetching && fetchNextPage()}
    >
      {inboxes.map((inbox) => (
        <InboxCard key={inbox.id} inbox={inbox} />
      ))}

      {isFetchingNextPage && <Loader />}

      {!hasNextPage && (
        <div className="my-4 flex items-center space-x-2">
        <hr className="flex-grow border-gray-300" />
        <span className="text-sm text-gray-500">End of conversations</span>
        <hr className="flex-grow border-gray-300" />
      </div>
      )}
    </InfiniteScrollContainer>
  );
};

export default InboxesContainer;
