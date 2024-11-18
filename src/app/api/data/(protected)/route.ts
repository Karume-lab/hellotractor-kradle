import prisma from "@/lib/prisma";
import { NextResponse } from "next/server";

export const GET = async () => {
  const buyer = await prisma.buyer.findUnique({
    where: {
      userId: "cm3ni3ldr000014l95mwm30g3",
    },
  });
  console.log(buyer ?? "s");
  return NextResponse.json({ message: "Hello World" });
};
