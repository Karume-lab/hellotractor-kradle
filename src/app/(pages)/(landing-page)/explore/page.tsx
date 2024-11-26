import React from "react";
import {
  FeaturedAttachmentsContainer,
  FeaturedTractorsContainer,
  TractorsContainer,
} from "@/components";
import { validateRequest } from "@/lib/lucia";

const ExplorePage = async () => {
  const session = await validateRequest();

  return session.user ? (
    <TractorsContainer />
  ) : (
    <>
      <FeaturedTractorsContainer />
      <FeaturedAttachmentsContainer />
    </>
  );
};

export default ExplorePage;
