import { PAGE_SIZE } from "@/lib/constants";
import { validateRequest } from "@/lib/lucia";
import prisma from "@/lib/prisma";
import { Equipment } from "@prisma/client";
import { NextRequest } from "next/server";

export interface WishlistPage {
  items: Equipment[];
  nextCursor: string | null;
}

export const GET = async (req: NextRequest) => {
  try {
    const { user } = await validateRequest();
    if (!user) {
      return Response.json({ message: "Unauthorized" }, { status: 401 });
    }

    const buyer = await prisma.buyer.findUnique({
      where: {
        id: user.profile?.buyer?.id,
      },
    });

    if (!buyer) {
      return Response.json({ message: "Buyer not found" }, { status: 404 });
    }

    const cursor = req.nextUrl.searchParams.get("cursor") || undefined;
    const searchQuery = req.nextUrl.searchParams.get("q") || "";

    const items = await prisma.equipment.findMany({
      where: {
        wishlist: {
          buyerId: buyer.id,
        },
        ...(searchQuery && {
          OR: [
            { name: { contains: searchQuery, mode: "insensitive" } },
            { description: { contains: searchQuery, mode: "insensitive" } },
          ],
        }),
      },
      take: PAGE_SIZE + 1,
      ...(cursor && { cursor: { id: cursor }, skip: 1 }),
      orderBy: {
        name: "asc",
      },
      include: {
        images: true,
        seller: {
          include: {
            profile: true,
          },
        },
        tractor: true,
        attachment: true,
      },
    });

    const nextCursor = items.length > PAGE_SIZE ? items[PAGE_SIZE].id : null;

    const data: WishlistPage = {
      items: items.slice(0, PAGE_SIZE),
      nextCursor,
    };

    return Response.json(data);
  } catch (error) {
    console.error(error);
    return Response.json({ message: "Internal server error" }, { status: 500 });
  }
};
