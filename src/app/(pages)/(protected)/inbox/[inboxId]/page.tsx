import { ChatsContainer } from "@/components";

interface InboxDetailPageProps {
  params: {
    inboxId: string;
  };
}

const InboxDetailPage = ({ params }: InboxDetailPageProps) => {
  return (
      <div className="h-full flex flex-col">
        <ChatsContainer />
      </div>
  );
};

export default InboxDetailPage;
