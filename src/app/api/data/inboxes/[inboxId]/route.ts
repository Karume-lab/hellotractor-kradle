import prisma from "@/lib/prisma";
import { inboxBuyerSellerMessagesDataInclude } from "@/lib/types";
import { NextResponse } from "next/server";

export const GET = async (
  req: Request,
  { params }: { params: { inboxId: string } }
) => {
  const { inboxId } = params;

  try {
    const inbox = await prisma.inbox.findUnique({
      where: {
        id: inboxId,
      },
      include: inboxBuyerSellerMessagesDataInclude,
    });

    if (!inbox) {
      return NextResponse.json({ message: "Inbox not found" }, { status: 404 });
    }

    return NextResponse.json(inbox);
  } catch (error: any) {
    console.error("Error fetching inbox:", error);
    return NextResponse.json(
      { message: "Failed to fetch inbox", error: error.message },
      { status: 500 }
    );
  }
};
