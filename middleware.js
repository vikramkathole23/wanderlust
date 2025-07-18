const Listing =require('./model/listing')
const {listingSchema,reviewSchema}=require('./schema')
const expressError=require('./utils/expressError')

module.exports.isLoggedIn = (req, res, next) => {
  if (!req.isAuthenticated()) {
    //  console.log(req.originalUrl);
    // req.session.redirectUrl = req.originalUrl;
    console.log(res.session);
    req.flash("error", "You must be Login in Wonderlust to Create Listings!");
    return res.redirect("/login");
  }
  next();
};

module.exports.saveRedirectURL = (req, res, next) => {
  if (
    req.session &&
    !["/login", "/signup"].includes(req.originalUrl) &&
    req.method === "GET"
  ) {
    req.session.redirectUrl = req.originalUrl;
  }
  next();
};

module.exports.isOwner = async (req, res, next) => {
  const { id } = req.params;
  let listing = await Listing.findById(id);
  if (!listing.owner._id.equals(res.locals.currUser._id)) {
    req.flash("error", "You are not owner of this Listings!!");
    return res.redirect(`/listings/${listing._id}`);
  }
  next()
};

module.exports.UploadMulterImage=(req, res, next) => {
    if (req.file) {
      req.body.image = {
        url: req.file.path,
        filename: req.file.filename
      };
    }
    next();
  }
  
module.exports.ValidateListing=(req,res,next)=>{
     let {error}=listingSchema.validate(req.body)
     if (error) {
      let errMsg=error
      console.log(errMsg)
      throw new expressError(404,errMsg);
     }else{
      next()
     }
}

module.exports.ValidateReview=(req,res,next)=>{
    const { error } = reviewSchema.validate(req.body);
     if (error) {
      let errMsg=error.details.map((e)=>e.message).join(",")
      // console.log(error);
      throw new expressError(error,404);
     }else{
      next()
     }
}