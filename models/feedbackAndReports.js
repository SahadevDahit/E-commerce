import mongoose from "mongoose";
const Schema = mongoose.Schema;

const feedbackAndReportSchema = new Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "users",
        required: true,
    },
    title: {
        type: String,
        required: true,
    },
    message: {
        type: String,
        required: [true, "Please add a message"],
    },

}, {
    timestamps: true,
});

const feedbackAndReport = mongoose.model("feedbackAndReports", feedbackAndReportSchema);

export default feedbackAndReport;