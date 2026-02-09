import mongoose from "mongoose";

const timelineSchema = new mongoose.Schema(
  {
    topic_id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Topic",
      required: true,
      index: true,
    },
    date: {
      type: String,
      required: true,
    },
    title: {
      type: String,
      required: true,
      trim: true,
    },
    description: {
      type: String,
      required: true,
    },
    // order: {
    //   type: Number,
    //   default: 0, // helps sorting timeline
    // },
  },
  { timestamps: true }
);

const Timeline = mongoose.model("Timeline", timelineSchema);

export default Timeline;
