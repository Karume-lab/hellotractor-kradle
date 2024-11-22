"use client";
import { URL_QUERY_STATES } from "@/lib/constants";
import { parseAsString, useQueryState } from "nuqs";
import React from "react";

const CreateContactInfoPage = () => {
  const [trainedOperatorId] = useQueryState(
    URL_QUERY_STATES.trainedOperatorId,
    parseAsString
  );

  return (
    <div>
      <span>contact info page</span>
      {trainedOperatorId}
    </div>
  );
};

export default CreateContactInfoPage;