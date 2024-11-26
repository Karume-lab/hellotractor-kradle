"use client";
import React from "react";
import kyInstance from "@/lib/ky";
import { TractorsPage } from "@/lib/types";
import { urls } from "@/lib/urls";
import { useInfiniteQuery } from "@tanstack/react-query";
import InfiniteScrollContainer from "../core/InfiniteScrollContainer";
import Loader from "../ui/Loader";
import { QUERY_KEYS } from "@/lib/constants";
import Image from "next/image";
import { formatPrice } from "@/lib/utils";
import { Button } from "../ui/button";
import { motion } from "framer-motion";

const FeaturedTractorsContainer = () => {
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
    return (
      <div className="flex justify-center items-center space-x-2">
        <div className="w-4 h-4 bg-primary rounded-full animate-pulse"></div>
        <div className="w-4 h-4 bg-primary rounded-full animate-pulse"></div>
        <div className="w-4 h-4 bg-primary rounded-full animate-pulse"></div>
      </div>
    );
  }

  if (status === "error") {
    return <p>An error occurred while loading tractors.</p>;
  }

  const tractors = data?.pages.flatMap((page) => page.tractors) || [];

  if (status === "success" && !tractors.length && !hasNextPage) {
    return <p>No tractors</p>;
  }

  return (
    <div className="px-4 sm:px-6 lg:px-8 mb-8">
      <h2 className="text-3xl font-semibold my-6 text-center">
        Featured Tractors
      </h2>
      <InfiniteScrollContainer
        className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6"
        onBottomReached={() => hasNextPage && !isFetching && fetchNextPage()}
      >
        {tractors.map((tractor, index) => (
          <motion.div
            key={tractor.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: index * 0.1 }}
            className="rounded-lg border bg-card text-card-foreground shadow-md p-4 flex flex-col relative w-full"
          >
            {/* Tractor Image */}
            <div className="w-full h-48 overflow-hidden rounded-lg">
              <Image
                src={tractor.equipment.images[0].path}
                alt="tractor"
                width={200}
                height={200}
                className="w-full h-full object-cover"
                layout="intrinsic"
                loading="lazy"
                quality={75}
              />
            </div>

            {/* Condition Badge */}
            <span className="absolute top-4 right-4 bg-[#f8285f] text-white text-xs rounded-full px-3 py-1 shadow-md">
              {tractor.equipment.condition}
            </span>

            {/* Tractor Name and Location */}
            <div className="mt-4">
              <h3 className="text-lg font-bold text-primary">
                {tractor.equipment.name}
              </h3>
              <span className="block text-xs text-gray-500 uppercase">
                Nairobi, Kenya
              </span>
            </div>

            {/* Fuel Capacity and Mileage */}
            <div className="flex flex-col my-4 text-sm text-gray-600">
              <span>Fuel Capacity: {tractor.fuelCapacity}</span>
              <span>Mileage: {tractor.mileage}</span>
            </div>

            {/* Price */}
            <p className="text-2xl text-green-500 font-bold mb-4">
              {formatPrice(tractor.equipment.price)}
            </p>

            {/* Details Button */}
            <div className="flex">
              <Button className="w-full" variant={"outline"}>
                Details
              </Button>
            </div>
          </motion.div>
        ))}

        {/* Loader for Infinite Scroll */}
        {isFetchingNextPage && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6 }}
          >
            <Loader className="my-4" />
          </motion.div>
        )}
      </InfiniteScrollContainer>
    </div>
  );
};

export default FeaturedTractorsContainer;
