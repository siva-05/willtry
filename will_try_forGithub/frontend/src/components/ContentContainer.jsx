import { useEffect, useRef } from "react";
import { useContentStore } from "../store/useContentStore";
import ContentHeader from "./ContentHeader";
import NoTimelinePlaceholder from "./NoTimelinePlaceholder";
import ContentFooter from "./ContentFooter";
import TimelinesLoadingSkeleton from "./TimelinesLoadingSkeleton";

function ChatContainer() {
  const {
    selectedTopic,
    getTimelinesByTopicId,
    timelines,
    isTimelinesLoading,
  } = useContentStore();
  const timelineEndRef = useRef(null);

  useEffect(() => {
    getTimelinesByTopicId(selectedTopic._id);
  }, [selectedTopic, getTimelinesByTopicId]);

  useEffect(() => {
    if (timelineEndRef.current) {
      timelineEndRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [timelines]);

  return (
    <>
      <ContentHeader />
      <div className="flex-1 px-6 overflow-y-auto py-8">

        {timelines.length > 0 && !isTimelinesLoading ? (<div className="tabs tabs-boxed bg-transparent p-2 m-2">
          <ul className="timeline timeline-snap-icon max-md:timeline-compact timeline-vertical">
            {timelines.map((timeline, index) => (

              <li key={timeline._id} >
                {index !== 0 && <hr />}

                <div className="timeline-middle">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                    className="h-5 w-5"
                  >
                    <path
                      fillRule="evenodd"
                      d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.857-9.809a.75.75 0 00-1.214-.882l-3.483 4.79-1.88-1.88a.75.75 0 10-1.06 1.061l2.5 2.5a.75.75 0 001.137-.089l4-5.5z"
                      clipRule="evenodd"
                    />
                  </svg>
                </div>

                <div
                  className={
                    index % 2 === 0
                      ? "timeline-start mb-10 md:text-end"
                      : "timeline-end md:mb-10"
                  }
                >
                  <time className="font-mono italic">{timeline.date}={index}</time>
                  <div className="text-lg font-black">{timeline.title}</div>
                  {timeline.description}
                </div>

                <hr />
              </li>
            ))}
          </ul>
          {/* 👇 scroll target */}
          <div ref={timelineEndRef} />
        </div>
        ) : isTimelinesLoading ? (
          <TimelinesLoadingSkeleton />
        ) : (
          <NoTimelinePlaceholder name={selectedTopic.topicName} />
        )}
      </div>
      {!isTimelinesLoading && timelines.length > 0 && <ContentFooter />}

    </>
  );
}

export default ChatContainer;
