import { Metadata } from "next";
import { siteConfig } from "./site-config";

export const defaultMetadata: Metadata = {
  title: {
    default: `${siteConfig.name}`,
    template: `%s | ${siteConfig.name}`,
  },
  description: "Find a tractor for you at an affordable price",
  keywords: ["tractor", "agriculture", "market place"],
};
