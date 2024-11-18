import { Metadata } from "next";

export const defaultMetadata: Metadata = {
  title: {
    default: "Your App Name",
    template: "%s | Your App Name",
  },
  description: "Your app description",
  keywords: ["your", "keywords", "here"],
};
