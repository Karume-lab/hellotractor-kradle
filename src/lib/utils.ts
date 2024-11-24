import { UserRole } from "@prisma/client";
import { clsx, type ClassValue } from "clsx";
import { User } from "lucia";
import { cache } from "react";
import { twMerge } from "tailwind-merge";
import prisma from "./prisma";
import { notFound } from "next/navigation";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const isAdminOrOwner = (user: User, entityId?: string) => {
  return user.role === UserRole.ADMIN || user.id === entityId;
};

export const getTask = cache(async (taskId: string) => {
  const task = await prisma.task.findUnique({
    where: {
      id: taskId,
    },
  });

  if (!task) {
    notFound();
  }

  return task;
});

export const formatPrice = (price: number) => {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(price);
};
