import { NextResponse } from "next/server";

export const GET = () => {
  console.log("reached");
  return NextResponse.json({ message: "Hello World" });
};
