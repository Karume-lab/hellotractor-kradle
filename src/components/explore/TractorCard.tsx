"use client";
import { Button } from "../ui/button";
import { useRouter } from "next/navigation";
import { useSession } from "@/providers/SessionProvider";
import { createOrGetInbox } from "@/app/(pages)/(protected)/inbox/actions";
import { toast } from "sonner";
import { T_TractorSellerAttachmentEquipmentDataInclude } from "@/lib/types";
import { useMutation } from "@tanstack/react-query";
import { urls } from "@/lib/urls";
import { Heart, HeartOff, MessageCircle } from "lucide-react";
import Image from "next/image";
import tractor1 from "/img/Core/tractors/tractor1.png";

interface TractorProps {
  tractor: T_TractorSellerAttachmentEquipmentDataInclude;
}

const TractorCard: React.FC<TractorProps> = ({ tractor }) => {
  const router = useRouter();
  const { user, session } = useSession();

  if (!session) {
    toast.error("You need to log in to contact the seller");
  }

  const seller = tractor.equipment.seller;
  const buyerId = user?.profile?.buyer?.id;

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "USD",
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(price);
  };

  const mutation = useMutation({
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

  const handleContactSellerOnClick = async () => {
    mutation.mutate({
      buyerId: buyerId!,
      sellerId: seller?.id!,
    });
  };

  return (
    <div className="rounded-lg border bg-card text-card-foreground shadow-sm p-2 flex flex-col relative w-80 ">
      <Image
        src={"/img/Core/tractors/tractor1.png"}
        alt="tractor"
        width={200}
        height={200}
        className="bg-slate-400 border w-full"
      />
      <span className="absolute top-4 right-4 bg-pink-600 text-xs  rounded-2xl p-2 text-primary ">{tractor.equipment.condition}</span>
      <div className="flex justify-between">
        <span className="text-2xl font-bold text-primary">
          {tractor.equipment.name}
        </span>
        <Heart />
        <HeartOff />
      </div>
      <span className="text-xs uppercase text-muted-foreground">Nairobi, Kenya</span>

      <div className="flex flex-col my-4">
        <span>{tractor.fuelCapacity}</span>
        <span>{tractor.mileage}</span>
      </div>


      <p className="text-2xl text-green-500 font-bold text-primary">
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
          <Button className="grow" variant={"outline"}>
            Details
          </Button>
          <Button className="" onClick={handleContactSellerOnClick}>
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
