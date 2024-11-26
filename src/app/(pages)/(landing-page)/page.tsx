import {
  FeaturedAttachmentsContainer,
  FeaturedTractorsContainer,
  Footer,
  HeroSection,
  LinkAsButton,
} from "@/components";
import CategorySection from "@/components/landing-page/Categories";
import Testimonials from "@/components/landing-page/Testimonials";
import ValueProposition from "@/components/landing-page/ValueProposition";
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

      <LinkAsButton
        className="w-fit mx-auto"
        text="View More"
        redirectTo={urls.EXPLORE}
      />

      {!session.user && (
        <>
          <CategorySection />
          <ValueProposition />
          <Testimonials />
          <Footer />
        </>
      )}
    </>
  );
};

export default LandingPage;
