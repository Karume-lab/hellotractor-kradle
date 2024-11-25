import { Inbox, Message, Prisma, Task } from "@prisma/client";
import { ACCOUNT_TYPES_MAPPING } from "./constants";
import { LucideProps } from "lucide-react";
import { Server as NetServer, Socket } from "net";
import { NextApiResponse } from "next";
import { Server as SocketIOServer } from "socket.io";

export interface TasksPage {
  tasks: Task[];
  nextCursor: string | null;
}

export const tractorSellerEquipmentDataInclude = {
  equipment: {
    include: {
      seller: {
        include: {
          profile: true,
          coverPicture: true,
          logo: true,
        },
      },
    },
  },
} satisfies Prisma.TractorInclude;

export type T_TractorSellerEquipmentDataInclude = Prisma.TractorGetPayload<{
  include: typeof tractorSellerEquipmentDataInclude;
}>;

export interface TractorsPage {
  tractors: T_TractorSellerEquipmentDataInclude[];
  nextCursor: string | null;
}

export const attachmentSellerEquipmentDataInclude = {
  equipment: {
    include: {
      seller: {
        include: {
          profile: true,
          coverPicture: true,
          logo: true,
        },
      },
    },
  },
} satisfies Prisma.AttachmentInclude;

export type T_AttachmentSellerEquipmentDataInclude =
  Prisma.AttachmentGetPayload<{
    include: typeof attachmentSellerEquipmentDataInclude;
  }>;

export interface AttachmentsPage {
  attachments: T_AttachmentSellerEquipmentDataInclude[];
  nextCursor: string | null;
}

export const inboxBuyerSellerMessagesDataInclude = {
  buyer: {
    include: {
      profile: true,
    },
  },
  seller: {
    include: {
      profile: true,
      logo: true,
    },
  },
  messages: {
    include: {
      buyer: {
        include: {
          profile: true,
        },
      },
      seller: {
        include: {
          profile: true,
        },
      },
      replyTo: true,
      replies: true,
    },
    orderBy: {
      createdAt: "desc",
    },
  },
} satisfies Prisma.InboxInclude;

export type T_InboxBuyerSellerMessagesDataInclude = Prisma.InboxGetPayload<{
  include: typeof inboxBuyerSellerMessagesDataInclude;
}>;
export interface InboxDetailPage {
  inbox: T_InboxBuyerSellerMessagesDataInclude;
  nextCursor: string | null;
}

export type T_Account_Type_Mapping_Value = "buyer" | "seller" | null;

export interface T_Account_Type_Mapping {
  value: T_Account_Type_Mapping_Value;
  label: string;
}

export type T_Account_Types_Mapping = typeof ACCOUNT_TYPES_MAPPING;

export type T_SideBarItem = {
  label: string;
  Icon: React.FC<LucideProps>;
  redirectTo: string;
};

export type NextApiResponseServerIO = NextApiResponse & {
  socket: Socket & {
    server: NetServer & {
      io: SocketIOServer;
    };
  };
};

export const trainedOperatorDataInclude = {
  profilePicture: true,
  services: true,
  contacts: true,
} satisfies Prisma.TrainedOperatorInclude;

export type T_TrainedOperatorDataInclude = Prisma.TrainedOperatorGetPayload<{
  include: typeof trainedOperatorDataInclude;
}>;

export interface TrainedOperatorsPage {
  trainedOperators: T_TrainedOperatorDataInclude[];
  nextCursor: string | null;
}
