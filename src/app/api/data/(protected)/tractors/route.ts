import { PAGE_SIZE } from "@/lib/constants";
import { validateRequest } from "@/lib/lucia";
import prisma from "@/lib/prisma";
import { tractorSellerEquipmentDataInclude, TractorsPage } from "@/lib/types";
import { NextRequest } from "next/server";

export const GET = async (req: NextRequest) => {
  try {
    const { user } = await validateRequest();

    const cursor = req.nextUrl.searchParams.get("cursor") || undefined;
    const searchQuery = req.nextUrl.searchParams.get("q") || "";
    const specificUser = req.nextUrl.searchParams.get("specific-user") || "";

    const tractors = await prisma.tractor.findMany({
      where: {
        equipment: {
          seller: {
            id: specificUser ? user?.profile?.seller?.id : undefined,
          },
        },
        OR: [
          {
            equipment: {
              name: {
                contains: searchQuery,
                mode: "insensitive",
              },
            },
          },
          {
            equipment: {
              seller: {
                OR: [
                  {
                    businessName: {
                      contains: searchQuery,
                      mode: "insensitive",
                    },
                  },
                  {
                    profile: {
                      firstName: {
                        contains: searchQuery,
                        mode: "insensitive",
                      },
                      lastName: {
                        contains: searchQuery,
                        mode: "insensitive",
                      },
                    },
                  },
                ],
              },
            },
          },
        ],
      },
      include: tractorSellerEquipmentDataInclude,
      take: PAGE_SIZE + 1,
      ...(cursor && { cursor: { id: cursor }, skip: 1 }),
      orderBy: {
        id: "desc",
      },
    });

    const nextCursor =
      tractors.length > PAGE_SIZE ? tractors[PAGE_SIZE].id : null;

    const data: TractorsPage = {
      tractors: tractors.slice(0, PAGE_SIZE),
      nextCursor,
    };

    return Response.json(data);
  } catch (error) {
    console.error(error);
    return Response.json({ message: "Internal server error" }, { status: 500 });
  }
};
