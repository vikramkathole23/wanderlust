const ExpressError = require("../utils/expressError");
const Listing = require("../model/listing");

module.exports.ShowListings = async (req, res) => {
  const listings = await Listing.find();
  res.render("listings/index", { listings });
};

module.exports.CreateListings = async (req, res) => {
  const { title, description, price, location, country,image } = req.body;
  try {
    const newListing = new Listing({
      title,
      description,
      price,
      location,
      country,
      image,
      owner:req.user._id
    });

    await newListing.save()
    req.flash("success", "Listing is created successfully!!");
    res.redirect(`/listings/${newListing._id}`);
  } catch (error) {
    console.error("Error in CreateListings:", error);
  }
};

module.exports.ShowSingleListing = async (req, res) => {
  const { id } = req.params;
  const listing = await Listing.findById(id)
    .populate({ path: "reviews", populate: { path: "author" } })
    .populate("owner");
  if (!listing) {
    req.flash("error", "Listing are you searching , It does not Exist ");
    return res.redirect("/listings");
  }
  // console.log(listing);
  res.render("listings/show", { listing });
};

module.exports.UpdateListingForm = async (req, res) => {
  const { id } = req.params;
  const listing = await Listing.findById(id);
  // console.log(listing);
  if (!listing) {
    return res.status(404).send("Listing not found");
  }
  res.render("listings/edit", { listing });
};

module.exports.UpdateListing = async (req, res) => {
  const { id } = req.params;
  const { title, description, price,image } = req.body;
  const updatedListing = await Listing.findByIdAndUpdate(
    id,
    { 
      title, 
      description, 
      price, 
      image: typeof res.file === "undefined" ? image : res.file.path 
    },
    { new: true }
  );
  if (!updatedListing) {
    return res.status(404).send("Listing not found");
  }
  console.log(updatedListing);
  
  req.flash("success", "Listing is Updated!!");
  res.redirect(`/listings/${updatedListing._id}`);
};

module.exports.DestroyListings = async (req, res) => {
  const { id } = req.params;
  const listing = await Listing.findByIdAndDelete(id);
  if (!listing) {
    return res.status(404).send("Listing not found");
  }
  req.flash("success", "Listing is Deleted!!");
  res.redirect("/listings");
};
