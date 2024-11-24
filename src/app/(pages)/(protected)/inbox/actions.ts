"use server";
import { KINDLY_TRY_AGAIN } from "@/lib/constants";
import { prisma } from "@/lib/prisma";
import { T_MessageSchema } from "@/lib/schemas";
import { z } from "zod";

const InboxCreateSchema = z.object({
  buyerId: z.string(),
  sellerId: z.string(),
});

export async function createOrGetInbox({
  buyerId,
  sellerId,
}: {
  buyerId: string;
  sellerId: string;
}) {
  try {
    const parsedInput = InboxCreateSchema.parse({ buyerId, sellerId });

    const existingInbox = await prisma.inbox.findUnique({
      where: {
        sellerId_buyerId: {
          sellerId: parsedInput.sellerId,
          buyerId: parsedInput.buyerId,
        },
      },
      include: {
        buyer: { include: { profile: true } },
        seller: { include: { profile: true, logo: true } },
        messages: {
          include: {
            replyTo: true,
            replies: true,
          },
          orderBy: { createdAt: "desc" },
        },
      },
    });

    if (existingInbox) {
      return existingInbox;
    }

    const newInbox = await prisma.inbox.create({
      data: {
        buyer: { connect: { id: parsedInput.buyerId } },
        seller: { connect: { id: parsedInput.sellerId } },
      },
      include: {
        buyer: { include: { profile: true } },
        seller: { include: { profile: true, logo: true } },
        messages: true,
      },
    });

    return newInbox;
  } catch (error) {
    console.error("Error creating or fetching inbox:", error);
    throw new Error("Failed to create or fetch inbox.");
  }
}

export const sendMessage = async (values: T_MessageSchema) => {
  try {
    if (!values.inboxId) {
      throw new Error("Inbox ID is required to send a message.");
    }

    const messageData = {
      content: values.content,
      inboxId: values.inboxId,
    } as any;

    if (values.buyerId) messageData.buyerId = values.buyerId;
    if (values.sellerId) messageData.sellerId = values.sellerId;

    console.log("Creating message with data:", messageData);

    const message = await prisma.message.create({
      data: messageData,
    });

    return {
      messageObj: message,
      message: "Message sent successfully.",
    };
  } catch (error) {
    console.error("Error sending message:", error);
    throw new Error(`Failed to send message ${KINDLY_TRY_AGAIN}`);
  }
};
