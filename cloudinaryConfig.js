const cloudinary = require('cloudinary').v2;
const { CloudinaryStorage } = require('multer-storage-cloudinary');

cloudinary.config(
    {
        cloud_name:process.env.CLAUD_NAME,
        api_key:process.env.CLAUDINARY_API_KEY,
        api_secret:process.env.CLAUDINARY_API_SECRETE
    }
)

const storage = new CloudinaryStorage({
  cloudinary: cloudinary,
  params: {
    folder: 'wanderlust',
    allowedFormats: ["png","jpg","jpeg"]
  },
});
 
module.exports ={
    storage,
    cloudinary
}