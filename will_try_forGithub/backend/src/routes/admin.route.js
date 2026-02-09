import express from "express";
import { insertTopic, insertTimeline } from "../controllers/admin.controller.js";


const router = express.Router();

router.post("/insertTopic", insertTopic);
router.post("/insertTimeline/:id", insertTimeline);


export default router;