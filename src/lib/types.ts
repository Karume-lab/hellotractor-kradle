import { Prisma, Task } from "@prisma/client";
import { ACCOUNT_TYPES_MAPPING } from "./constants";
import { LucideProps } from "lucide-react";

export interface TasksPage {
  tasks: Task[];
  nextCursor: string | null;
}

export const tractorSellerAttachmentEquipmentDataInclude = {
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

export type T_TractorSellerAttachmentEquipmentDataInclude =
  Prisma.TractorGetPayload<{
    include: typeof tractorSellerAttachmentEquipmentDataInclude;
  }>;

export interface TractorsPage {
  tractors: T_TractorSellerAttachmentEquipmentDataInclude[];
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
