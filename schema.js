const Joi = require("joi");

const listingSchema = Joi.object({
  title: Joi.string().required(),
  description: Joi.string().required(),
  location: Joi.string().required(),
  country: Joi.string().required(),
  price: Joi.number().required(),
  image: Joi.object({
    url: Joi.string().required(),
    filename:Joi.string().required()
  }).required(),
  
});

const reviewSchema = Joi.object({
  review: Joi.object({
    comments: Joi.string().required(),
    rating: Joi.number().min(1).max(5).required()
  }).required()
  // comments: Joi.string().required(),
  // rating: Joi.number().min(1).max(5).required(),
  // listingId: Joi.string().required() ,
  // author:Joi.string().required() 
});
module.exports ={
  listingSchema,
  reviewSchema
};