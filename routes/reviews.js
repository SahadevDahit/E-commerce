import exppress from "express";
import {
    createReviewCtrl,
    updateReviewCtrl,
    deleteReviewCtrl,
    getReviewCtrl,
    getSingleReview
} from "../controllers/reviews.js";
import {
    isLoggedIn
} from "../middlewares/isLoggedIn.js";

const reviewRouter = exppress.Router();
reviewRouter.get('/', getReviewCtrl);
reviewRouter.get('/:id', getSingleReview);
reviewRouter.put('/:id', isLoggedIn, updateReviewCtrl);
reviewRouter.delete('/:id', isLoggedIn, deleteReviewCtrl);

reviewRouter.post("/:productID", isLoggedIn, createReviewCtrl);

export default reviewRouter;