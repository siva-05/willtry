import { useEffect } from "react";
import { useContentStore } from "../store/useContentStore";
import TopicsLoadingSkeleton from "./TopicsLoadingSkeleton";
import { useAuthStore } from "../store/useAuthStore";

function TopicList() {
  const { allTopics, getAllTopics, setSelectedTopic, isTopicsLoading } = useContentStore();
  const { onlineUsers } = useAuthStore();

  useEffect(() => {
    getAllTopics();
  }, [getAllTopics]);

  if (isTopicsLoading) return <TopicsLoadingSkeleton />;

  return (
    <>
      {allTopics.map((topic) => (
        <div
          key={topic._id}
          className="bg-cyan-500/10 p-4 rounded-lg cursor-pointer hover:bg-cyan-500/20 transition-colors"
          onClick={() => setSelectedTopic(topic)}
        >
          <div className="flex items-center gap-3">
            <div className={`avatar ${onlineUsers.includes(topic._id) ? "online" : "offline"}`}>
              <div className="size-12 rounded-full">
                <img src={topic.profilePic || "/avatar.png"} />
              </div>
            </div>
            <h4 className="text-slate-200 font-medium">{topic.topicName}</h4>
          </div>
        </div>
      ))}
    </>
  );
}
export default TopicList;
