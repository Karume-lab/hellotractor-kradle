import { Footer, HeroSection } from "@/components";
import { validateRequest } from "@/lib/lucia";
import React from "react";

const LandingPage = async () => {
  const session = await validateRequest();

  return (
    <>
      {!session.user && <HeroSection />}

      {!session.user && <Footer />}
    </>
  );
};

export default LandingPage;
