import asyncHandler from "express-async-handler";
import feedbackAndReport from "../models/feedbackAndReports.js";

/* These are three controller functions for handling HTTP requests related to feedback and reports. */
export const createFeedbackAndReport = asyncHandler(async (req, res) => {
    const {
        title,
        message
    } = req.body;
    const FeedbackAndReports = await feedbackAndReport.create({
        user: req.userAuthId,
        title: title,
        message: message
    });
    res.json({
        status: "success",
        message: "feedbackAndReport submitted successfully",
        FeedbackAndReports,
    });

});
export const getFeedbackAndReports = asyncHandler(async (req, res) => {
    const FoundFeedbackAndReports = await feedbackAndReport.find();
    res.json({
        status: "success",
        message: "FeedbackAndReports fetched successfully",
        FoundFeedbackAndReports,
    });
});
export const getFeedbackAndReportsById = asyncHandler(async (req, res) => {
    const FoundFeedbackAndReports = await feedbackAndReport.findById(req.params.id);
    res.json({
        status: "success",
        message: "FeedbackAndReports fetched successfully",
        FoundFeedbackAndReports,
    });

})