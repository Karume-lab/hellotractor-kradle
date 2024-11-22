import React from "react";
import { PlusCircle } from "lucide-react";
import { useSession } from "@/providers/SessionProvider";
import LinkAsButton from "../core/LinkAsButton";
import { urls } from "@/lib/urls";

const AddAccountTypeButton = ({}) => {
  const { getAvailableAccountTypes } = useSession();
  return (
    <>
      {!!getAvailableAccountTypes().length && (
        <LinkAsButton redirectTo={urls.CREATE_ACCOUNT_TYPE}>
          <PlusCircle />
          <span>Add new account type</span>
        </LinkAsButton>
      )}
    </>
  );
};

export default AddAccountTypeButton;
