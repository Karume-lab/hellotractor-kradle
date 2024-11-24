import prisma from "@/lib/prisma";
import { NextResponse } from "next/server";

export const GET = async (req: Request) => {
  const { searchParams } = new URL(req.url);
  const buyerId = searchParams.get("buyerId");
  const sellerId = searchParams.get("sellerId");

  try {
    const conditions: Record<string, string | undefined> = {};
    if (buyerId) conditions.buyerId = buyerId;
    if (sellerId) conditions.sellerId = sellerId;

    const inboxes = await prisma.inbox.findMany({
      where: conditions,
      include: {
        buyer: {
          include: {
            profile: true,
          },
        },
        seller: {
          include: {
            profile: true,
            logo: true,
          },
        },
        messages: {
          include: {
            buyer: {
              include: {
                profile: true,
              },
            },
            seller: {
              include: {
                profile: true,
              },
            },
            replyTo: true,
            replies: true,
          },
          orderBy: {
            createdAt: "desc",
          },
        },
      },
    });

    if (inboxes.length === 0) {
      return NextResponse.json(
        { message: "No inboxes found" },
        { status: 404 }
      );
    }

    return NextResponse.json(inboxes);
  } catch (error: any) {
    console.error("Error fetching inboxes:", error);
    return NextResponse.json(
      { message: "Failed to fetch inboxes", error: error.message },
      { status: 500 }
    );
  }
};
