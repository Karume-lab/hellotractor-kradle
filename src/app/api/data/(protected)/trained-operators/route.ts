import { PAGE_SIZE } from "@/lib/constants";
import prisma from "@/lib/prisma";
import { trainedOperatorDataInclude, TrainedOperatorsPage } from "@/lib/types";
import { NextRequest } from "next/server";

export const GET = async (req: NextRequest) => {
  try {
    const cursor = req.nextUrl.searchParams.get("cursor") || undefined;
    const searchQuery = req.nextUrl.searchParams.get("q") || "";

    const trainedOperators = await prisma.trainedOperator.findMany({
      where: {
        OR: [
          {
            firstName: {
              contains: searchQuery,
              mode: "insensitive",
            },
          },
          {
            lastName: {
              contains: searchQuery,
              mode: "insensitive",
            },
          },
          {
            displayName: {
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
        ],
      },
      include: trainedOperatorDataInclude,
      take: PAGE_SIZE + 1,
      ...(cursor && { cursor: { id: cursor }, skip: 1 }),
      orderBy: {
        id: "desc",
      },
    });

    const nextCursor =
      trainedOperators.length > PAGE_SIZE
        ? trainedOperators[PAGE_SIZE].id
        : null;

    const data: TrainedOperatorsPage = {
      trainedOperators: trainedOperators.slice(0, PAGE_SIZE),
      nextCursor,
    };

    return Response.json(data);
  } catch (error) {
    console.error(error);
    return Response.json({ message: "Internal server error" }, { status: 500 });
  }
};
