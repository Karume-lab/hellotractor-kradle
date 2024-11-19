import { NextResponse } from "next/server";

export const GET = async () => {
  try {
    return NextResponse.json({});
  } catch (error) {
    return NextResponse.json({ error: "An error occurred" }, { status: 500 });
  }
};
