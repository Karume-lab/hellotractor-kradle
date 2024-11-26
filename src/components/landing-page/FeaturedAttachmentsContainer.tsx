"use client";
import React from "react";
import kyInstance from "@/lib/ky";
import { AttachmentsPage, TractorsPage } from "@/lib/types";
import { urls } from "@/lib/urls";
import { useInfiniteQuery } from "@tanstack/react-query";
import InfiniteScrollContainer from "../core/InfiniteScrollContainer";
import Loader from "../ui/Loader";
import { QUERY_KEYS } from "@/lib/constants";
import Image from "next/image";
import { formatPrice } from "@/lib/utils";
import { Button } from "../ui/button";

const FeaturedAttachmentsContainer = () => {
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

  if (status === "pending") {
    return <p>Loading ...</p>;
  }

  if (status === "error") {
    return <p>An error occurred while loading attachments.</p>;
  }

  const attachments = data?.pages.flatMap((page) => page.attachments) || [];

  if (status === "success" && !attachments.length && !hasNextPage) {
    return <p>No attachments</p>;
  }

  return (
    <InfiniteScrollContainer
      className="flex"
      onBottomReached={() => hasNextPage && !isFetching && fetchNextPage()}
    >
      {attachments.map((attachment) => (
        <div className="rounded-lg border bg-card text-card-foreground shadow-sm p-2 flex flex-col relative w-80 ">
          <Image
            src={"/img/Core/tractors/tractor1.png"}
            alt="tractor"
            width={200}
            height={200}
            className="border w-full"
          />
          <span className="absolute top-4 right-4 bg-pink-600 text-xs  rounded-2xl p-2 text-primary ">
            {attachment.equipment.condition}
          </span>
          <div className="flex justify-between mt-2">
            <span className="text-2xl font-bold text-primary">
              {attachment.equipment.name}
            </span>
          </div>
          <span className="text-xs uppercase text-muted-foreground">
            Nairobi, Kenya
          </span>

          <div className="flex flex-col my-4">
            <span>{attachment.color}</span>
          </div>

          <p className="text-2xl text-green-500 font-bold text-primary">
            {formatPrice(attachment.equipment.price)}
          </p>

          <div className="flex justify-between gap-2 ">
            <Button className="grow" variant={"outline"}>
              Details
            </Button>
          </div>
        </div>
      ))}

      {isFetchingNextPage && <Loader className="my-4" />}
    </InfiniteScrollContainer>
  );
};

export default FeaturedAttachmentsContainer;
