import { PAGE_SIZE } from "@/lib/constants";
import prisma from "@/lib/prisma";
import { NextRequest } from "next/server";
import { dealerDataInclude, DealersPage } from "@/lib/types";

export const GET = async (req: NextRequest) => {
  try {
    const cursor = req.nextUrl.searchParams.get("cursor") || undefined;
    const searchQuery = req.nextUrl.searchParams.get("q") || "";

    const dealers = await prisma.dealer.findMany({
      where: {
        OR: [
          {
            name: {
              contains: searchQuery,
              mode: "insensitive",
            },
          },
          {
            contacts: {
              some: {
                OR: [
                  {
                    email: {
                      contains: searchQuery,
                      mode: "insensitive",
                    },
                  },
                  {
                    phoneNumber: {
                      contains: searchQuery,
                      mode: "insensitive",
                    },
                  },
                ],
              },
            },
          },
          {
            services: {
              some: {
                title: {
                  contains: searchQuery,
                  mode: "insensitive",
                },
              },
            },
          },
        ],
      },
      include: dealerDataInclude,
      take: PAGE_SIZE + 1,
      ...(cursor && { cursor: { id: cursor }, skip: 1 }),
      orderBy: {
        id: "desc",
      },
    });

    const nextCursor =
      dealers.length > PAGE_SIZE ? dealers[PAGE_SIZE].id : null;

    const data: DealersPage = {
      dealers: dealers.slice(0, PAGE_SIZE),
      nextCursor,
    };

    return Response.json(data);
  } catch (error) {
    console.error(error);
    return Response.json({ message: "Internal server error" }, { status: 500 });
  }
};
