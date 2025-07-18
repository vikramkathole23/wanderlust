const express = require("express");
const router = express.Router({ mergeParams: true });
const asyncWrap = require("../utils/asyncwrap.js");
const ReviewControllesr =require("../Controllers/reviews.controller.js")
const { ValidateReview, isLoggedIn } = require("../middleware");

// Reviews routes
// submit reviews
router.post(
  "/",
  isLoggedIn,
  ValidateReview, asyncWrap(ReviewControllesr.createReviews)
);

// delete reviews
router.delete(
  "/:reviewId",
  asyncWrap(ReviewControllesr.destroyReviews)
);

module.exports = router;
