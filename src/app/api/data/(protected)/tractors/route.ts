import { PAGE_SIZE } from "@/lib/constants";
import prisma from "@/lib/prisma";
import {
  tractorAttachmentEquipmentDataInclude,
  TractorsPage,
} from "@/lib/types";
import { NextRequest } from "next/server";

export const GET = async (req: NextRequest) => {
  try {
    const cursor = req.nextUrl.searchParams.get("cursor") || undefined;
    const searchQuery = req.nextUrl.searchParams.get("q") || "";

    const tractors = await prisma.tractor.findMany({
      where: {
        equipment: {
          name: {
            contains: searchQuery,
            mode: "insensitive",
          },
        },
      },
      include: tractorAttachmentEquipmentDataInclude,
      take: PAGE_SIZE + 1,
      ...(cursor && { cursor: { id: cursor }, skip: 1 }),
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
