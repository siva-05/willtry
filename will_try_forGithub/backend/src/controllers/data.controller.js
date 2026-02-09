import Topic from "../models/Topic.js";
import Timeline from "../models/Timeline.js";

export const getAllTopics = async (req, res) => {
  try {
    const allTopics = await Topic.find({ isActive: true });

    res.status(200).json(allTopics);
  } catch (error) {
    console.log("Error in getAllTopics:", error);
    res.status(500).json({ message: "Server error" });
  }
};

export const getTimelinesByTopicId = async (req, res) => { 
  try {
    const { id: selectedTopicId } = req.params;

    const timelines = await Timeline.find({
      topic_id: selectedTopicId
    });

  //   const timelines = await Timeline.find({ topic_id: selectedTopicId })
  // .sort({ date: 1 }); // ascending

    res.status(200).json(timelines);
  } catch (error) {
    console.log("Error in getTimelinesByTopicId controller:", error.message);
    res.status(500).json({ error: "Internal server error" });
  }
};







