import React from "react";
import { PlusCircle } from "lucide-react";
import { useSession } from "@/providers/SessionProvider";
import ButtonAsLink from "../core/ButtonAsLink";
import { urls } from "@/lib/urls";

const AddAccountTypeButton = ({}) => {
  const { getAvailableAccountTypes } = useSession();
  return (
    <>
      {getAvailableAccountTypes().length && (
        <ButtonAsLink redirectTo={urls.NEW_ACCOUNT_TYPE}>
          <PlusCircle />
          <span>Add new account type</span>
        </ButtonAsLink>
      )}
    </>
  );
};

export default AddAccountTypeButton;
