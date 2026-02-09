import { XIcon } from "lucide-react";
import { useContentStore } from "../store/useContentStore";
import { useEffect } from "react";

function ContentHeader() {
  const { selectedTopic, setSelectedTopic } = useContentStore();

  useEffect(() => {
    const handleEscKey = (event) => {
      if (event.key === "Escape") setSelectedTopic(null);
    };

    window.addEventListener("keydown", handleEscKey);

    // cleanup function
    return () => window.removeEventListener("keydown", handleEscKey);
  }, [setSelectedTopic]);

  return (
    <div
      className="flex justify-between items-center bg-slate-800/50 border-b
   border-slate-700/50 max-h-[84px] px-6 flex-1"
    >
      <div className="flex items-center space-x-3">
        <div>
          <h3 className="text-slate-200 font-bold text-xl">{selectedTopic.topicName}</h3>
        </div>
      </div>

      <button onClick={() => setSelectedTopic(null)}>
        <XIcon className="w-5 h-5 text-slate-400 hover:text-slate-200 transition-colors cursor-pointer" />
      </button>
    </div>
  );
}
export default ContentHeader;
