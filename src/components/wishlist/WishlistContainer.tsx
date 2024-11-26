"use client";

import { Equipment } from "@prisma/client";
import { useInfiniteQuery } from "@tanstack/react-query";
import kyInstance from "@/lib/ky";
import { QUERY_KEYS } from "@/lib/constants";
import InfiniteScrollContainer from "../core/InfiniteScrollContainer";
import Loader from "../ui/Loader";
import { urls } from "@/lib/urls";
import Image from "next/image";
import { formatPrice } from "@/lib/utils";

interface WishlistPage {
  items: (Equipment & {
    images: { url: string }[];
    seller: {
      profile: { name: string };
      businessName?: string | null;
    } | null;
  })[];
  nextCursor: string | null;
}

const WishlistContainer = () => {
  const {
    data,
    status,
    fetchNextPage,
    hasNextPage,
    isFetching,
    isFetchingNextPage,
  } = useInfiniteQuery({
    queryKey: [QUERY_KEYS.wishlist],
    queryFn: ({ pageParam }) =>
      kyInstance
        .get(
          urls.API_WISHLIST,
          pageParam ? { searchParams: { cursor: pageParam } } : {}
        )
        .json<WishlistPage>(),
    initialPageParam: null as string | null,
    getNextPageParam: (lastPage) => lastPage.nextCursor,
  });

  if (status === "pending") {
    return <WishlistLoadingSkeleton />;
  }

  if (status === "error") {
    return (
      <div className="text-center py-8">
        <p className="text-red-500">
          An error occurred while loading your wishlist.
        </p>
      </div>
    );
  }

  const items = data?.pages.flatMap((page) => page.items) || [];

  if (status === "success" && !items.length && !hasNextPage) {
    return (
      <div className="text-center py-8">
        <p className="text-gray-500">Your wishlist is empty</p>
      </div>
    );
  }

  return (
    <div className="p-8">
      <InfiniteScrollContainer
        onBottomReached={() => hasNextPage && !isFetching && fetchNextPage()}
      >
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {items.map((item) => (
            <EquipmentCard key={item.id} equipment={item} />
          ))}
        </div>
        {isFetchingNextPage && (
          <div className="flex justify-center my-4">
            <Loader />
          </div>
        )}
        {!hasNextPage && items.length > 0 && (
          <p className="text-center text-gray-500 my-4">
            You have reached the end
          </p>
        )}
      </InfiniteScrollContainer>
    </div>
  );
};

interface EquipmentCardProps {
  equipment: WishlistPage["items"][0];
}

const EquipmentCard: React.FC<EquipmentCardProps> = ({ equipment }) => {
  const thumbnail = equipment.images[0]?.url;
  const sellerName =
    equipment.seller?.businessName || equipment.seller?.profile.name;

  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden">
      <div className="aspect-w-16 aspect-h-9 relative">
        {thumbnail ? (
          <Image
            src={thumbnail}
            alt={equipment.name}
            fill
            className="object-cover"
          />
        ) : (
          <div className="w-full h-full bg-gray-200 flex items-center justify-center">
            <span className="text-gray-400">No image</span>
          </div>
        )}
      </div>
      <div className="p-4">
        <h3 className="font-semibold text-lg">{equipment.name}</h3>
        <p className="text-primary font-medium mt-2">
          {formatPrice(equipment.price)}
        </p>
        {equipment.condition && (
          <p className="text-sm text-gray-600 mt-1">
            Condition: {equipment.condition}
          </p>
        )}
        {sellerName && (
          <p className="text-sm text-gray-600 mt-1">Seller: {sellerName}</p>
        )}
      </div>
    </div>
  );
};

const WishlistLoadingSkeleton = () => (
  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
    {Array.from({ length: 6 }).map((_, index) => (
      <div
        key={index}
        className="bg-white rounded-lg shadow-md overflow-hidden animate-pulse"
      >
        <div className="aspect-w-16 aspect-h-9 bg-gray-200" />
        <div className="p-4">
          <div className="h-6 bg-gray-200 rounded w-3/4 mb-2" />
          <div className="h-5 bg-gray-200 rounded w-1/4 mb-2" />
          <div className="h-4 bg-gray-200 rounded w-1/2" />
        </div>
      </div>
    ))}
  </div>
);

export default WishlistContainer;
