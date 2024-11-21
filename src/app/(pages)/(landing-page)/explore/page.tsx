import React from "react";
import { TractorsContainer } from "@/components";
import { validateRequest } from "@/lib/lucia";

const ExplorePage = async () => {
  const { user } = await validateRequest();
  return (
    <>
      {user?.email ?? "None"}
      <TractorsContainer />
    </>
  );
};

export default ExplorePage;
