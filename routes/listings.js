if (process.env.NODE_ENV != "production") {
  require('dotenv').config()
}
const express = require("express");
const router = express.Router();
const asyncWrap = require("../utils/asyncwrap");
const methodeOverride = require("method-override");
const ListingController = require("../Controllers/Listing.controller.js")
const { isLoggedIn, isOwner, ValidateListing,UploadMulterImage } = require("../middleware.js");
const {storage} = require("../cloudinaryConfig.js")
const multer  = require('multer')
const upload = multer({ storage})


router.use(methodeOverride("_method"));

router.route("/")
.get( asyncWrap(ListingController.ShowListings) )
.post(
  isLoggedIn,
  upload.single('image'),
  UploadMulterImage,
  ValidateListing,
  asyncWrap(ListingController.CreateListings)
)


// create route
router.get("/new", isLoggedIn, (req, res) => {
  res.render("listings/new.ejs"); // Pass the price to the form
});

router.route("/:id")
.get(
  asyncWrap(ListingController.ShowSingleListing)
)
.patch(
  upload.single('image'),
  UploadMulterImage,
  ValidateListing,
  asyncWrap(ListingController.UpdateListing)
)

// update route
router.get(
  "/:id/edit",
  isLoggedIn,
  isOwner,
  asyncWrap(ListingController.UpdateListingForm)
);

// delete route
router.delete(
  "/:id/delete",
  isLoggedIn,
  isOwner,
  asyncWrap(ListingController.DestroyListings)
);

module.exports = router;
