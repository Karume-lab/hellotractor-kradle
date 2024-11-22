"use client";
import { URL_QUERY_STATES } from "@/lib/constants";
import { parseAsString, useQueryState } from "nuqs";
import React from "react";

const CreateContactInfoPage = () => {
  const [dealerId] = useQueryState(URL_QUERY_STATES.dealerId, parseAsString);

  return (
    <div>
      <span>contact info page</span>
      {dealerId}
    </div>
  );
};

export default CreateContactInfoPage;
