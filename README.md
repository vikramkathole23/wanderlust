# Wanderlust 🌍✨

**Wanderlust** is a full-stack travel listing web app where users can explore, create, and manage stays with secure authentication, image uploads, and a smooth, responsive UI.

## 📜 Overview
Wanderlust is designed to mimic real-world booking platforms, allowing travelers to browse listings and hosts to add their own. It features **CRUD operations**, **Cloudinary image storage**, and an **MVC architecture** for clean, maintainable code.

## 🚀 Features
- 🔐 User Authentication (Sign up, Login, Logout)
- 🏠 Create, Edit, and Delete Listings
- 📸 Upload and Display Listing Images via Cloudinary
- 💾 MongoDB + Mongoose Database
- 🎨 EJS templates + CSS for a clean UI
- ⚙️ Middleware for validation and error handling

## 🛠 Tech Stack
- **Backend:** Node.js, Express.js
- **Frontend:** EJS, CSS
- **Database:** MongoDB (Mongoose)
- **Media Handling:** Cloudinary
- **Auth & Security:** Passport.js, bcrypt

## 📦 Installation & Setup
```bash
# Clone the repository
git clone https://github.com/vikramkathole23/wanderlust.git

# Move into project folder
cd wanderlust

# Install dependencies
npm install

# Create a .env file in root and add:
# CLOUDINARY_CLOUD_NAME=your_name
# CLOUDINARY_API_KEY=your_key
# CLOUDINARY_API_SECRET=your_secret
# MONGODB_URI=your_mongo_uri
# SESSION_SECRET=your_secret_key

# Run the app
npm start
