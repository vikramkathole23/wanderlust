const Listing = require("../model/listing.js");
const Review = require("../model/reviews.js"); 

module.exports.createReviews=async (req, res) => {
    try {
      let listing = await Listing.findById(req.params.id);
      const reviewData = req.body.review;
      // console.log(reviewData);
      const review = new Review({
        ...reviewData,
        listing: listing._id,
        author: req.user._id,
      });
      // console.log(review);
      // console.log(res.locals.currUser._id===review.author._id);
      
      await review.save();
      listing.reviews.push(review._id);
      await listing.save();
      req.flash("success", "Review is Submited!!");
      res.redirect(`/listings/${listing._id}`);
    } catch (error) {
      console.log(error);
    }
  }

  module.exports.destroyReviews = async (req, res) => {
    const { id, reviewId } = req.params;
    const listing = await Listing.findByIdAndUpdate(
      id,
      { $pull: { reviews: reviewId } },
      { new: true }
    );
    let review = await Review.findByIdAndDelete(reviewId);
    // console.log(review);
    req.flash("success", "Review is Deleted!!");
    res.redirect(`/listings/${listing._id}`);
  }