import {
  EquipmentCondition,
  FileCategoryEnum,
  FileExtension,
  PrismaClient,
} from "@prisma/client";
import countriesData from "./../data/countries.json";
import countiesData from "./../data/counties.json";
import dealersData from "./../data/dealers.json";
import tractorsData from "./../data/tractors.json";

const prisma = new PrismaClient();

async function seedKenyanDemographics() {
  console.log("[+] Clearing existing counties ...");
  await prisma.county.deleteMany({});
  console.log("[+] Cleared counties ...");

  console.log("[+] Clearing existing countries ...");
  await prisma.country.deleteMany({});
  console.log("[+] Cleared countries ...");

  console.log("[+] Creating countries ...");
  const countries = await Promise.all(
    countriesData.map(async (countryData) => {
      const country = await prisma.country.create({
        data: { name: countryData.name },
      });
      return country;
    })
  );
  console.log("[+] Countries created ...");

  const kenya = countries.find((country) => country.name === "Kenya");
  if (!kenya) {
    throw new Error("Kenya country was not created");
  }

  const countiesWithCountry = countiesData.map((countyData) => ({
    name: countyData.name,
    countryId: kenya.id,
  }));

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

async function seedDealers() {
  console.log("[+] Clearing existing dealers ...");
  await prisma.dealer.deleteMany({});
  console.log("[+] Cleared dealers ...");

  console.log("[+] Creating dealers ...");

  const dealers = await Promise.all(
    dealersData.map(async (dealerData) => {
      const locations = await Promise.all(
        dealerData.locations.map(async (locationData) => {
          const county = await prisma.county.findFirst({
            where: { name: locationData.county },
          });

          if (!county) {
            console.log(`[!] County not found: ${locationData.county}`);
            return {};
          }

          const country = await prisma.country.findFirst({
            where: { name: locationData.country },
          });

          if (!country) {
            console.log(`[!] Country not found: ${locationData.country}`);
            return {};
          }

          return {
            county: {
              connect: { id: county.id },
            },
            country: {
              connect: { id: country.id },
            },
            phoneNumber: locationData.phoneNumber,
            address: locationData.address,
          };
        })
      );

      const dealer = await prisma.dealer.create({
        data: {
          name: dealerData.name,
          locations: {
            create: locations.filter(Boolean),
          },
        },
      });
      return dealer;
    })
  );

  console.log(`[+] Seeded ${dealers.length} dealers.`);
}

async function seedTractors() {
  console.log("[+] Clearing existing tractors ...");
  await prisma.equipment.deleteMany({});
  await prisma.tractor.deleteMany({});
  await prisma.fileUpload.deleteMany({});
  console.log("[+] Cleared existing tractors ...");

  for (const tractor of tractorsData) {
    const equipment = await prisma.equipment.create({
      data: {
        name: tractor.name,
        description: tractor.description,
        price: tractor.price,
        condition: tractor.condition as EquipmentCondition,
        averageRating: tractor.averageRating,
        isSold: tractor.isSold,
      },
    });

    const fileUpload = await prisma.fileUpload.create({
      data: {
        path: tractor.logoUrl,
        extension: FileExtension.PNG,
        category: FileCategoryEnum.EQUIPMENT_IMAGE,
        equipmentImageId: equipment.id,
      },
    });

    await prisma.tractor.create({
      data: {
        mileage: tractor.mileage,
        fuelCapacity: tractor.fuelCapacity,
        equipmentId: equipment.id,
      },
    });
  }

  console.log(`[+] Seeded ${tractorsData.length} tractors.`);
}

async function main() {
  try {
    console.log("[+] Seeding database ...");
    await seedKenyanDemographics();
    await seedDealers();
    await seedTractors();
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
