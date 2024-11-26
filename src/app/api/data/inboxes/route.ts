import { NextRequest, NextResponse } from "next/server";
import prisma from "@/lib/prisma";
import { validateRequest } from "@/lib/lucia";
import { PAGE_SIZE } from "@/lib/constants";

export async function GET(request: NextRequest) {
  try {
    const session = await validateRequest();

    if (!session) {
      return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
    }

    const isUserBuyer = Boolean(session.user?.profile?.buyer);
    const isUserSeller = Boolean(session.user?.profile?.seller);

    const cursor = request.nextUrl.searchParams.get("cursor") || undefined;

    let inboxes;

    if (isUserBuyer) {
      inboxes = await prisma.inbox.findMany({
        where: {
          buyerId: session.user?.profile?.buyer?.id,
        },
        include: {
          seller: {
            include: {
              profile: true,
            },
          },
          messages: {
            orderBy: {
              createdAt: "desc",
            },
          },
        },
        take: PAGE_SIZE + 1,
        ...(cursor && { cursor: { id: cursor }, skip: 1 }),
        orderBy: {
          id: "desc",
        },
      });
    } else if (isUserSeller) {
      inboxes = await prisma.inbox.findMany({
        where: {
          sellerId: session.user?.profile?.seller?.id,
        },
        include: {
          buyer: {
            include: {
              profile: true,
            },
          },
          messages: {
            orderBy: {
              createdAt: "desc",
            },
          },
        },
        take: PAGE_SIZE + 1,
        ...(cursor && { cursor: { id: cursor }, skip: 1 }),
        orderBy: {
          id: "desc",
        },
      });
    } else {
      return NextResponse.json(
        { message: "Invalid user role" },
        { status: 403 }
      );
    }

    const nextCursor =
      inboxes.length > PAGE_SIZE ? inboxes[PAGE_SIZE].id : null;

    return NextResponse.json(
      {
        inboxes: inboxes.slice(0, PAGE_SIZE),
        nextCursor,
      },
      { status: 200 }
    );
  } catch (error) {
    console.error("Error fetching inboxes:", error);
    return NextResponse.json(
      {
        message: "Internal server error",
        error: error instanceof Error ? error.message : "Unknown error",
      },
      { status: 500 }
    );
  }
}
