import { validateRequest } from "@/lib/lucia";
import { isAdminOrOwner } from "@/lib/utils";
import { NextResponse } from "next/server";

export const GET = async () => {
  const { user } = await validateRequest();

  if (!user || !isAdminOrOwner(user)) {
    return new Response(JSON.stringify({ message: "Unauthorized" }), {
      status: 401,
    });
  }
  console.log("reached");
  return NextResponse.json({ message: "Hello World" });
};
