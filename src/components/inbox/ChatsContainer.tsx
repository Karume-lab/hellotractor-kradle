"use client";

import { QUERY_KEYS } from "@/lib/constants";
import ChatBubblesContainer from "./ChatBubblesContainer";
import ChatInput from "./ChatInput";
import { useInfiniteQuery } from "@tanstack/react-query";
import { urls } from "@/lib/urls";
import kyInstance from "@/lib/ky";
import { InboxDetailPage } from "@/lib/types";
import { ChatProvider } from "@/providers/ChatProvider";
import { useParams } from "next/navigation";

const ChatsContainer = () => {
  const { inboxId } = useParams();

  const {
    data,
    status,
    fetchNextPage,
    hasNextPage,
    isFetching,
    isFetchingNextPage,
  } = useInfiniteQuery({
    queryKey: [QUERY_KEYS.inbox, inboxId],
    queryFn: ({ pageParam }) =>
      kyInstance
        .get(
          urls.API_INBOX(inboxId as string),
          pageParam ? { searchParams: { cursor: pageParam } } : {}
        )
        .json<InboxDetailPage>(),
    enabled: !!inboxId,
    initialPageParam: null as string | null,
    getNextPageParam: (lastPage) => lastPage.nextCursor,
  });

  const inboxData = data?.pages[0] ?? null;

  return (
    <ChatProvider inboxActive={inboxData as any}>
      <ChatBubblesContainer />
      <ChatInput />
    </ChatProvider>
  );
};

export default ChatsContainer;
