import { PrismaClient } from "@prisma/client";
import countriesData from "./../data/countries.json"; // JSON file with country data
import countiesData from "./../data/counties.json"; // JSON file with counties data

const prisma = new PrismaClient();

async function seedKenyanDemographics() {
  // Clear existing counties
  console.log("[+] Clearing existing counties ...");
  await prisma.county.deleteMany({});
  console.log("[+] Cleared counties ...");

  // Create countries first
  console.log("[+] Creating countries ...");
  const countries = await Promise.all(
    countriesData.map(async (countryData) => {
      const country = await prisma.country.create({
        data: {
          name: countryData.name,
        },
      });
      return country;
    })
  );
  console.log("[+] Countries created ...");

  // Find Kenya from the created countries
  const kenya = countries.find((country) => country.name === "Kenya");
  if (!kenya) {
    throw new Error("Kenya country was not created");
  }

  // Prepare counties with correct relationships
  const countiesWithCountry = countiesData.map((countyData) => ({
    name: countyData.name,
    country: {
      connect: { id: kenya.id }, // Connect each county to Kenya by countryId
    },
  }));

  // Create counties
  console.log("[+] Creating counties for Kenya ...");
  const counties = await Promise.all(
    countiesWithCountry.map(async (countyData) => {
      const county = await prisma.county.create({
        data: countyData,
      });
      return county;
    })
  );
  console.log(`[+] Seeded ${counties.length} counties.`);
}

async function main() {
  try {
    console.log("[+] Seeding database ...");
    await seedKenyanDemographics();
    console.log("[+] Seeding complete!");
  } catch (error) {
    console.error("[!] Error occurred during seeding:", error);
  } finally {
    await prisma.$disconnect();
  }
}

main().catch((error) => {
  console.error("Unexpected error:", error);
  process.exit(1);
});
