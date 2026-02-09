import { useContentStore } from "../store/useContentStore";
import BorderAnimatedContainer from "../components/BorderAnimatedContainer";
import ProfileHeader from "../components/ProfileHeader";
import TopicList from "../components/TopicList";
import ContentContainer from "../components/ContentContainer";
import NoContentPlaceholder from "../components/NoContentPlaceholder";

function ChatPage() {
  const { selectedTopic } = useContentStore();

  return (

    <div className="relative w-full max-w-6xl h-[800px]">
      <BorderAnimatedContainer>
        {/* LEFT SIDE */}
        <div className="w-80 bg-slate-800/50 backdrop-blur-sm flex flex-col">
          <ProfileHeader />
          <div className="flex-1 overflow-y-auto p-4 space-y-2">
            <TopicList />
          </div>
        </div>

        {/* RIGHT SIDE */}
        <div className="flex-1 flex flex-col bg-slate-900/40 backdrop-blur-sm">
          {selectedTopic ? <ContentContainer /> : <NoContentPlaceholder />}
        </div>
      </BorderAnimatedContainer>
    </div>
  );
}
export default ChatPage;
