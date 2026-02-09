import express from "express";
import { getAllTopics, getTimelinesByTopicId } from "../controllers/data.controller.js";
import { protectRoute } from "../middleware/auth.middleware.js";

const router = express.Router();

router.use(protectRoute);//NEED TO COMMENT

router.get("/topics", getAllTopics);
router.get("/timelines/:id", getTimelinesByTopicId);

export default router;
