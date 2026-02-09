import { useState } from "react";
import { useContentStore } from "../store/useContentStore";
import BorderAnimatedContainer from "../components/BorderAnimatedContainer";
import ProfileHeader from "../components/ProfileHeader";
import TopicList from "../components/TopicList";
import ContentContainer from "../components/ContentContainer";
import NoContentPlaceholder from "../components/NoContentPlaceholder";
import { ChevronLeft, ChevronRight } from "lucide-react";

function ChatPage() {
  const { selectedTopic } = useContentStore();
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);

  return (
    <div className="relative w-full max-w-6xl h-[800px]">
      <BorderAnimatedContainer>

        {/* LEFT SIDE */}
        <div
          className={`
            relative
            transition-all duration-300 ease-in-out
            bg-slate-800/50 backdrop-blur-sm flex flex-col
            ${isSidebarOpen ? "w-80" : "w-0 overflow-hidden"}
          `}
        >
          {isSidebarOpen && (
            <>
              <ProfileHeader />
              <div className="flex-1 overflow-y-auto p-4 space-y-2">
                <TopicList />
              </div>
            </>
          )}

          {/* TOGGLE BUTTON */}
          <button
            onClick={() => setIsSidebarOpen(!isSidebarOpen)}
            className="
              absolute top-1/2 -right-4 z-20
              w-8 h-8 rounded-full
              bg-slate-900 border border-slate-700
              flex items-center justify-center
              hover:bg-slate-700 transition
            "
          >
            <ChevronLeft className="w-4 h-4 text-white" />
          </button>
        </div>

        {/* COLLAPSED BUTTON (when closed) */}
        {!isSidebarOpen && (
          <button
            onClick={() => setIsSidebarOpen(true)}
            className="
              absolute left-0 top-1/2 z-20
              w-8 h-8 rounded-full
              bg-slate-900 border border-slate-700
              flex items-center justify-center
              hover:bg-slate-700 transition
            "
          >
            <ChevronRight className="w-4 h-4 text-white" />
          </button>
        )}

        {/* RIGHT SIDE */}
        <div className="flex-1 flex flex-col bg-slate-900/40 backdrop-blur-sm">
          {selectedTopic ? <ContentContainer /> : <NoContentPlaceholder />}
        </div>

      </BorderAnimatedContainer>
    </div>
  );
}

export default ChatPage;
