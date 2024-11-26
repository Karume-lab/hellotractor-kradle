"use client";
import { urls } from "@/lib/urls";
import LinkAsButton from "../core/LinkAsButton";

const AdminDashboard = () => {
  return (
    <div className="">
      <h1 className="text-4xl text-center my-4">
        Select the entity you would like to manage
      </h1>
      <div className="flex gap-4 p-4 justify-center items-center">
        <LinkAsButton
          redirectTo={urls.PUBLIC_ADMIN_MANAGE_TRACTORS}
          text="Tractors"
          className="text-lg py-4 px-6"
        />

        <LinkAsButton
          redirectTo={urls.PUBLIC_ADMIN_MANAGE_ATTACHMENTS}
          text="Attachments"
          className="text-lg py-4 px-6"
        />
        <LinkAsButton
          redirectTo={urls.PUBLIC_ADMIN_MANAGE_TRAINED_OPERATORS}
          text="Trained Operators"
          className="text-lg py-4 px-6"
        />

        <LinkAsButton
          redirectTo={urls.PUBLIC_ADMIN_MANAGE_DEALERS}
          text="Dealers"
          className="text-lg py-4 px-6"
        />
      </div>
    </div>
  );
};

export default AdminDashboard;
