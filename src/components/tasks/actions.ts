"use server";
import { validateRequest } from "@/lib/lucia";
import prisma from "@/lib/prisma";
import { createTaskSchema, T_CreateTaskSchema } from "@/lib/schemas";
import { isAdminOrOwner } from "@/lib/utils";

export const createTask = async (values: T_CreateTaskSchema) => {
  const { user } = await validateRequest();

  if (!user) {
    throw Error("Unauthorized");
  }

  const { title } = createTaskSchema.parse({ ...values });

  const task = await prisma.task.create({
    data: {
      title,
      userId: user.id,
    },
  });
  return task;
};

export const deleteTask = async (taskId: string) => {
  const { user } = await validateRequest();
  if (!user || !isAdminOrOwner(user, taskId)) {
    throw Error("Unauthorized");
  }

  const task = await prisma.task.findUnique({
    where: {
      id: taskId,
    },
  });

  if (!task) {
    throw new Error("Task not found");
  }

  const deletedTask = await prisma.task.delete({
    where: {
      id: taskId,
    },
  });

  return deletedTask;
};
