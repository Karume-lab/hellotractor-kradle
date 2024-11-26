"use client";
import { Button } from "../ui/button";
import { useRouter } from "next/navigation";
import { useSession } from "@/providers/SessionProvider";
import { createOrGetInbox } from "@/app/(pages)/(protected)/inbox/actions";
import { toast } from "sonner";
import { T_TractorSellerEquipmentDataInclude } from "@/lib/types";
import { useMutation } from "@tanstack/react-query";
import { urls } from "@/lib/urls";
import { Heart, HeartOff, MessageCircle } from "lucide-react";
import { addToWishlist } from "@/app/(pages)/(protected)/equipment/tractors/create/actions";
import { formatPrice } from "@/lib/utils";
import Image from "next/image";
import tractor1 from "/img/Core/tractors/tractor1.png";
import { useState } from "react";

interface TractorProps {
  tractor: T_TractorSellerEquipmentDataInclude;
}

const TractorCard: React.FC<TractorProps> = ({ tractor }) => {
  const router = useRouter();
  const { user, session } = useSession();
  const [wishlist, setWishlist] = useState(false);

  if (!session) {
    toast.error("You need to log in to contact the seller");
  }

  const seller = tractor.equipment.seller;
  const buyerId = user?.profile?.buyer?.id;

  const sendMessagemutation = useMutation({
    mutationFn: ({
      buyerId,
      sellerId,
    }: {
      buyerId: string;
      sellerId: string;
    }) => createOrGetInbox({ buyerId, sellerId }),
    onSuccess: ({ id }) => {
      toast.success("Successfully started a conversation with the seller!");
      router.push(urls.INBOX_DETAIL(id));
    },
    onError: (error: Error) => {
      toast.error(error.message || "Something went wrong");
    },
  });

  const handleContactSellerOnClick = () => {
    sendMessagemutation.mutate({
      buyerId: buyerId!,
      sellerId: seller?.id!,
    });
  };

  const addToWishlistmutation = useMutation({
    mutationFn: addToWishlist,
    onSuccess: ({ message }) => {
      toast.success(message);
    },
    onError: (error: Error) => {
      toast.error(error.message || "Something went wrong");
    },
  });

  const handleAddToWishlistClick = (equipmentId: string) => {
    addToWishlistmutation.mutate(equipmentId);
    setWishlist(!wishlist);
  };

  return (
    <div className="rounded-lg border bg-card text-card-foreground shadow-sm p-2 flex flex-col relative w-80 ">
      <Image
        src={"/img/Core/tractors/tractor1.png"}
        alt="tractor"
        width={200}
        height={200}
        className="border w-full"
      />
      <span className="absolute top-4 right-4 bg-[#f8285f] text-xs  rounded-2xl p-2 text-white ">
        {tractor.equipment.condition}
      </span>
      <div className="flex justify-between mt-2">
        <span className="text-2xl font-bold text-primary">
          {tractor.equipment.name}
        </span>
        <div onClick={() => handleAddToWishlistClick(tractor.equipment.id)}>
          {wishlist ? <HeartOff /> : <Heart />}
        </div>
      </div>
      <span className="text-xs uppercase text-muted-foreground">
        Nairobi, Kenya
      </span>

      <div className="flex flex-col my-4">
        <span>{tractor.fuelCapacity}</span>
        <span>{tractor.mileage}</span>
      </div>

      <p className="text-2xl text-green-500 font-bold ">
        {formatPrice(tractor.equipment.price)}
      </p>
      {seller?.businessName ||
        `${seller?.profile.firstName} ${seller?.profile.lastName}`}
      <p>
        {/* {seller?.businessName && `${seller.businessName} - `}
        {seller?.profile.firstName} {seller?.profile.lastName} */}
      </p>

      {!(seller?.id !== tractor.equipment.sellerId) && (
        <div className="flex justify-between gap-2 ">
          <Button className="grow hover:bg-[#f8285f] transition-colors duration-200 " variant={"outline"}>
            Details
          </Button>
          <Button className="bg-gradient-to-r from-[#f8285f] to-primary" onClick={handleContactSellerOnClick}>
            {
              <>
                <MessageCircle className="" />
                Contact Seller
              </>
            }
          </Button>
        </div>
      )}
    </div>
  );
};

export default TractorCard;
