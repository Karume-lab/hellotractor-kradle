"use client";
import { Button } from "../ui/button";
import { useRouter } from "next/navigation";
import { useSession } from "@/providers/SessionProvider";
import { createOrGetInbox } from "@/app/(pages)/(protected)/inbox/actions";
import { toast } from "sonner";
import { T_TractorSellerAttachmentEquipmentDataInclude } from "@/lib/types";
import { useMutation } from "@tanstack/react-query";
import { urls } from "@/lib/urls";
import { MessageCircle } from "lucide-react";

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
    <>
      <p className="text-2xl font-bold text-primary">
        {formatPrice(tractor.equipment.price)}
      </p>
      <span>{tractor.fuelCapacity}</span>
      <span>{tractor.mileage}</span>
      {tractor.equipment.description}
      {tractor.equipment.condition}
      {seller?.businessName ||
        `${seller?.profile.firstName} ${seller?.profile.lastName}`}
      <p>
        {seller?.businessName && `${seller.businessName} - `}
        {seller?.profile.firstName} {seller?.profile.lastName}
      </p>

      {!(seller?.id !== tractor.equipment.sellerId) && (
        <Button className="w-full" onClick={handleContactSellerOnClick}>
          {
            <>
              <MessageCircle className="mr-2 h-4 w-4" />
              Contact Seller
            </>
          }
        </Button>
      )}
    </>
  );
};

export default TractorCard;
