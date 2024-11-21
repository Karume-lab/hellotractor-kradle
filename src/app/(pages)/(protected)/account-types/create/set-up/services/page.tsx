import ServicesContainer from "@/components/account-types/ServicesContainer";
import React from "react";

const CreateServicesPage = () => {
  return (
    <div className="p-6 space-y-6">
      <h1 className="text-2xl font-bold">Manage Services</h1>
      <p className="text-gray-600">
        Add, edit, or remove services to manage your offerings effectively.
      </p>
      <ServicesContainer />
    </div>
  );
};

export default CreateServicesPage;
