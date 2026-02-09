import Topic from "../models/Topic.js";
import Timeline from "../models/Timeline.js";

export const insertTopic = async (req, res) => {
    const { topicName } = req.body

    try {
        if (!topicName) {
            return res.status(400).json({ message: "Topic name field is required" });
        }
        const topic = await Topic.findOne({ topicName });
        if (topic) return res.status(400).json({ message: "Topic name already exists" })

        const newTopic = new Topic({
            topicName
        })

        if (newTopic) {

            await newTopic.save();

            res.status(201).json({ //status code 201 means successfully created
                _id: newTopic._id,
                name: newTopic.topicName
            });
        } else {
            res.status(400).json({ message: "Invalid topic" })
        }

    } catch (error) {
        console.log("Error in topic controller:", error)
        res.status(500).json({ message: "Internal server error" })
    }
};


export const insertTimeline = async (req, res) => {
  try {
    const { date, title, description } = req.body;
    const { id: givenTopicId } = req.params;
    // const senderId = req.user._id;

    if (!date || !title || !description) {
      return res.status(400).json({ message: "The date, title and description are required." });
    }
    const topicExists = await Topic.exists({ _id: givenTopicId });
    if (!topicExists) {
      return res.status(404).json({ message: "Topic not found." });
    }


    const newTimeline = new Timeline({
        topic_id : givenTopicId,
        date,
        title,
        description
    });

    await newTimeline.save();

    res.status(201).json(newTimeline);
  } catch (error) {
    console.log("Error in insertTimeline controller: ", error.message);
    res.status(500).json({ error: "Internal server error" });
  }
};
