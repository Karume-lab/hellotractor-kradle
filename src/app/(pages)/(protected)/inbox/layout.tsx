import React from "react";
import { InboxesContainer } from "@/components";

export const metadata = {
  title: "Inbox",
};

const InboxLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="flex h-screen">
      {/* Sidebar with Inboxes */}
      <div className="w-1/3 border-r border-gray-200 overflow-y-auto bg-gray-100">
        <InboxesContainer />
      </div>

      {/* Main Content */}
      <div className="flex-1">{children}</div>
    </div>
  );
};

export default InboxLayout;
