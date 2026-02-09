import { create } from "zustand";
import { axiosInstance } from "../lib/axios";
import toast from "react-hot-toast";

export const useContentStore = create((set, get) => ({
  allTopics: [],
  timelines: [],
  selectedTopic: null,
  isTopicsLoading: false,
  isTimelinesLoading: false,
  isSoundEnabled: JSON.parse(localStorage.getItem("isSoundEnabled")) === true,

  toggleSound: () => {
    localStorage.setItem("isSoundEnabled", !get().isSoundEnabled);
    set({ isSoundEnabled: !get().isSoundEnabled });
  },

  setActiveTab: (tab) => set({ activeTab: tab }),
  setSelectedTopic: (selectedTopic) => set({ selectedTopic }),

  getAllTopics: async () => { //need to work
    set({ s: true });
    try {
      const res = await axiosInstance.get("/data/topics");
      set({ allTopics: res.data });
    } catch (error) {
      toast.error(error.response.data.message);
    } finally {
      set({ s: false });
    }
  },

  getTimelinesByTopicId: async (topicId) => { //need to work
    set({ isTimelinesLoading: true });
    try {
      const res = await axiosInstance.get(`/data/timelines/${topicId}`);
      set({ timelines: res.data });
    } catch (error) {
      toast.error(error.response?.data?.message || "Something went wrong"); //optional chaining if we get undefined it will show the text
    } finally {
      set({ isTimelinesLoading: false });
    }
  },

}));
