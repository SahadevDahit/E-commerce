import exppress from "express";
import {
    getFeedbackAndReports,
    getFeedbackAndReportsById,
    createFeedbackAndReport
} from "../controllers/feedbackAndReports.js";
import {
    isLoggedIn
} from "../middlewares/isLoggedIn.js";

const feedbackAndReports = exppress.Router();
feedbackAndReports.get('/', isLoggedIn, getFeedbackAndReports);
feedbackAndReports.get('/:id', isLoggedIn, getFeedbackAndReportsById);
feedbackAndReports.post("/", isLoggedIn, createFeedbackAndReport);

export default feedbackAndReports;