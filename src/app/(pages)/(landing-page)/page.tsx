import {
  FeaturedAttachmentsContainer,
  FeaturedTractorsContainer,
  Footer,
  HeroSection,
  LinkAsButton,
} from "@/components";
import { validateRequest } from "@/lib/lucia";
import { urls } from "@/lib/urls";
import React from "react";

const LandingPage = async () => {
  const session = await validateRequest();

  return (
    <>

      {!session.user && <HeroSection />}

      <FeaturedTractorsContainer />
      <FeaturedAttachmentsContainer />

      <LinkAsButton text="View More" redirectTo={urls.EXPLORE} />

      {!session.user && <Footer />}
    </>
  );
};

export default LandingPage;
