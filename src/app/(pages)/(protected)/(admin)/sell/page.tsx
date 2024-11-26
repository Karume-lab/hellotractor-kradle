import { LinkAsButton } from "@/components";
import { urls } from "@/lib/urls";
import React from "react";

const SellPage = () => (
  <div className="space-y-6 mx-auto w-fit">
    <h1 className="text-2xl font-bold">Sell Your Equipment</h1>
    <p className="text-gray-600">
      Choose the type of agri-equipment you want to sell. Select one of the
      options below to get started.
    </p>

    <div className="flex flex-col md:flex-row gap-4">
      <div className="flex flex-col items-center space-y-2 text-center">
        <LinkAsButton
          text="Sell a Tractor"
          redirectTo={urls.CREATE_TRACTOR}
          className="w-full md:w-auto"
        />
        <p className="text-sm text-gray-500">
          List your tractor for sale and connect with buyers quickly.
        </p>
      </div>

      <div className="flex flex-col items-center space-y-2 text-center">
        <LinkAsButton
          text="Sell an Attachment"
          redirectTo={urls.CREATE_ATTACHMENT}
          className="w-full md:w-auto"
        />
        <p className="text-sm text-gray-500">
          Advertise agricultural attachments and implement to a targeted
          audience.
        </p>
      </div>
    </div>
  </div>
);

export default SellPage;
