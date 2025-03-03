const mongoose = require('mongoose');

const Profile = new mongoose.Schema({
    bio: { type: String },
    profilePicture: { type: String }
});

module.exports = mongoose.model('UserProfile', Profile);
