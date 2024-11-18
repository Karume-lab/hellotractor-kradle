"use client";
import { Button } from "@/components/ui/button";
import { SharedLayout } from "@/layouts";
import React from "react";
import { FaArrowLeft } from "react-icons/fa6";
import { useRouter } from "next/navigation";

const NotFound = () => {
  const router = useRouter();

  const goBack = () => {
    router.back();
  };

  return (
    <SharedLayout>
      <div className="w-full  h-screen bg-gray-100 flex items-center justify-center">
        <div className="text-center mx-4 md:mx-8 lg:mx-0 bg-white bg-opacity-90 p-8 md:p-12 rounded-md shadow-lg max-w-4xl w-full">
          {/* <Image
          src="/core/not-found.png"
          alt="Not found image"
          width={1000}
          height={1000}
        /> */}
          <h1 className="text-4xl sm:text-5xl font-bold text-red-600">
            Page Not Found
          </h1>
          <p className="mt-6 text-lg sm:text-xl text-gray-700">
            Sorry, it seems like the page you are looking for does not exist.
          </p>
          <div className="mt-8 flex justify-center gap-x-4">
            <Button className="text-lg" onClick={goBack}>
              <FaArrowLeft />
              <span>Go Back</span>
            </Button>
          </div>
        </div>
      </div>
    </SharedLayout>
  );
};

export default NotFound;
