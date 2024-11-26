import { PrismaClient } from "@prisma/client";
import { NextResponse } from "next/server";

const prisma = new PrismaClient();

export async function GET() {
  try {
    const countries = await prisma.country.findMany({
      include: {
        counties: true,
      },
      orderBy: {
        name: "asc",
      },
    });

    return NextResponse.json(countries, { status: 200 });
  } catch (error) {
    console.error("Error fetching countries:", error);
    return NextResponse.json(
      { error: "Failed to fetch countries" },
      { status: 500 }
    );
  } finally {
    await prisma.$disconnect();
  }
}
