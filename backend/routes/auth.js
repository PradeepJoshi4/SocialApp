const express = require('express');
const jwt = require('jsonwebtoken');
const User = require('../models/User'); // Assuming you have the User model
const multer = require('multer');
const Post = require('../models/Post'); // Assuming you have a Post model
const path = require('path');
const Profile = require("../models/Profile");

const router = express.Router();

// User registration route
router.post('/register', async (req, res) => {
  const { name, email, password, confirmPassword } = req.body;

  // Basic validation
  if (password !== confirmPassword) {
    return res.status(400).json({ message: "Passwords don't match" });
  }

  try {
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: 'Email already in use' });
    }

    const newUser = new User({
      name,
      email,
      password,  // Store the plain text password
    });

    await newUser.save();
    res.status(201).json({ message: 'User registered successfully' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
});

// User login route
router.post('/login', async (req, res) => {
  const { email, password } = req.body;

  try {
    // Find user by email
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({ message: 'Invalid credentials' });
    }

    // Compare passwords (no hashing, directly compare plain text)
    if (password !== user.password) {
      return res.status(400).json({ message: 'Invalid credentials' });
    }

    // Create JWT token including the role in the payload
    const token = jwt.sign(
      {
        userId: user._id,
        email: user.email,
        name: user.name,
        role: user.role,  // Include the role field here
        department: user.department
      },
      process.env.JWT_SECRET,  // Secret key (use environment variable)
      { expiresIn: '1h' }      // Expiry time (e.g., 1 hour)
    );

    // Send the token as a response
    res.json({ token });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
});


// Add new user
router.post('/adduser', async (req, res) => {
  const { name, email, password, role } = req.body;

  const token = req.headers.authorization?.split(' ')[1]; // Get token from Authorization header

  if (!token) {
    return res.status(403).json({ message: 'Access denied: No token provided.' });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET); // Verify the token

    if (decoded.role !== 'admin') {
      return res.status(403).json({ message: 'Access denied: Admin only.' });
    }

    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: 'Email already in use' });
    }

    const newUser = new User({
      name,
      email,
      password,  // Store the plain text password (you should hash it in production!)
      role,
      department
    });

    await newUser.save();

    // Fetch all users after the new user is added and send them as the response
    const users = await User.find();
    res.status(201).json(users);  // Send the entire list of users
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
});


// to get list of user 

router.get('/users', async (req, res) => {


  try {
    // Verify JWT token
    const token = req.headers.authorization?.split(' ')[1];  // Get token from Authorization header
    if (!token) {
      return res.status(403).json({ message: 'Access denied: No token provided.' });
    }

    // const decoded = jwt.verify(token, process.env.JWT_SECRET);
    // if (decoded.role !== 'admin' || decoded.role !== 'user') {
    //   return res.status(403).json({ message: 'Access denied: Admin only.' });
    // }

    // Fetch all users from the database
    const users = await User.find();
    res.json(users);  // Send the users list as a response
  } catch (error) {
    console.error('Error in /users route:', error);  // Log the error on the server
    res.status(500).json({ message: 'Server error while fetching users.' });
  }
});

// Delete a user by ID
router.delete('/users/:id', async (req, res) => {
  const { id } = req.params;  // Get user ID from URL params

  try {
    // Check if the logged-in user is an admin
    const token = req.headers.authorization?.split(' ')[1];
    if (!token) {
      return res.status(403).json({ message: 'Access denied: No token provided.' });
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    if (decoded.role !== 'admin') {
      return res.status(403).json({ message: 'Access denied: Admin only.' });
    }

    // Find and delete the user by ID
    const user = await User.findByIdAndDelete(id);
    if (!user) {
      return res.status(404).json({ message: 'User not found.' });
    }

    res.status(200).json({ message: 'User deleted successfully.' });
  } catch (error) {
    console.error('Error deleting user:', error);
    res.status(500).json({ message: 'Server error while deleting user.' });
  }
});


// Edit a user's details by ID
router.put('/users/:id', async (req, res) => {
  const { id } = req.params;
  const { name, email, role, password, department } = req.body;  // Get new user data from request body

  try {
    // Check if the logged-in user is an admin
    const token = req.headers.authorization?.split(' ')[1];
    if (!token) {
      return res.status(403).json({ message: 'Access denied: No token provided.' });
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    if (decoded.role !== 'admin') {
      return res.status(403).json({ message: 'Access denied: Admin only.' });
    }

    // Find user by ID and update their details
    const user = await User.findById(id);
    if (!user) {
      return res.status(404).json({ message: 'User not found.' });
    }

    // Update fields if provided (name, email, role)
    if (name) user.name = name;
    if (email) user.email = email;
    if (role) user.role = role;
    if (password) user.password = password;
    if (department) user.department = department;

    await user.save();  // Save the updated user

    res.status(200).json({ message: 'User updated successfully.' });
  } catch (error) {
    console.error('Error updating user:', error);
    res.status(500).json({ message: 'Server error while updating user.' });
  }
});


// Logout Route (Stateless JWT logout)
router.post('/logout', (req, res) => {
  // Since JWTs are stateless, the only thing we can do is let the client know that they should delete their token.
  // There's no session or data to invalidate on the server side.

  res.status(200).json({ message: 'Logged out successfully. Please remove your token from storage.' });
});




// Set up multer for image uploads
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'uploads/'); // Save in 'uploads' folder
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + path.extname(file.originalname)); // Unique filename
  }
});

const upload = multer({ storage: storage });

router.post('/createpost', upload.single('image'), async (req, res) => {
  const { caption } = req.body;  // The caption input from the frontend
  const token = req.headers.authorization?.split(' ')[1]; // JWT token

  if (!token) {
    return res.status(403).json({ message: 'Access denied: No token provided.' });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET); // Verify the token

    const newPost = new Post({
      userId: decoded.userId,
      caption: caption,
      createdAt: new Date(),
    });

    // If an image is uploaded, store its relative path in the post
    if (req.file) {
      newPost.imageUrl = `uploads/${req.file.filename}`; // Save the relative path for the image
    }

    await newPost.save();
    res.status(201).json({ message: 'Post created successfully', post: newPost });

  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error while creating post.' });
  }
});




// Fetch all posts (for the current logged-in user)
router.get('/posts', async (req, res) => {
  const token = req.headers.authorization?.split(' ')[1]; // JWT token

  if (!token) {
    return res.status(403).json({ message: 'Access denied: No token provided.' });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET); // Verify the token

    // Fetch posts for the logged-in user
    const posts = await Post.find({ userId: decoded.userId }).sort({ createdAt: -1 }); // Sort by latest post

    res.status(200).json(posts); // Send the posts as the response
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error while fetching posts.' });
  }
});


const mongoose = require('mongoose');

// Edit a post by ID
router.put('/posts/:id', upload.single('image'), async (req, res) => {
  const { id } = req.params; // Get post ID from URL params
  const { caption } = req.body; // The new caption
  const token = req.headers.authorization?.split(' ')[1]; // JWT token

  if (!token) {
    return res.status(403).json({ message: 'Access denied: No token provided.' });
  }

  try {
    // Validate the ObjectId format
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({ message: 'Invalid post ID.' });
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET); // Verify the token

    // Find the post by ID
    const post = await Post.findById(id);
    if (!post) {
      return res.status(404).json({ message: 'Post not found.' });
    }

    // Ensure that the post belongs to the logged-in user or admin (if admin can edit all)
    if (post.userId.toString() !== decoded.userId.toString() && decoded.role !== 'admin') {
      return res.status(403).json({ message: 'Access denied: You can only edit your own posts or admin posts.' });
    }

    // Update caption if provided
    if (caption) {
      post.caption = caption;
    }

    // If a new image is uploaded, update the image URL
    if (req.file) {
      post.imageUrl = `uploads/${req.file.filename}`;
    }

    await post.save(); // Save the updated post

    res.status(200).json({ message: 'Post updated successfully', post });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error while updating post.' });
  }
});




// Delete a post by ID
router.delete('/delete/:id', async (req, res) => {
  const { id } = req.params; // Get post ID from URL params
  const token = req.headers.authorization?.split(' ')[1]; // JWT token

  if (!token) {
    return res.status(403).json({ message: 'Access denied: No token provided.' });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET); // Verify the token

    // Find the post by ID
    const post = await Post.findById(id);
    if (!post) {
      return res.status(404).json({ message: 'Post not found.' });
    }

    // Ensure that the post belongs to the logged-in user or admin (if admin can delete all)
    if (post.userId.toString() !== decoded.userId.toString() && decoded.role !== 'admin') {
      return res.status(403).json({ message: 'Access denied: You can only delete your own posts or admin posts.' });
    }

    // Delete the post
    await Post.findByIdAndDelete(id);

    res.status(200).json({ message: 'Post deleted successfully.' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error while deleting post.' });
  }
});



router.post('/createprofile', upload.single('image'), async (req, res) => {
  const token = req.headers.authorization?.split(' ')[1]; // JWT token

  if (!token) {
    return res.status(403).json({ message: 'Access denied: No token provided.' });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET); // Verify the token

    const createProfile = new Post({
      userId: decoded.userId,
      bio: bio,
      createdAt: new Date(),
    });

    // If an image is uploaded, store its relative path in the post
    if (req.file) {
      createProfile.imageUrl = `uploads/${req.file.filename}`; // Save the relative path for the image
    }

    await createProfile.save();
    res.status(201).json({ message: 'Post created successfully', profile: createProfile });

  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error while creating post.' });
  }
});


// Search users by name or email
router.get('/search', async (req, res) => {
  const { query } = req.query;  // Search term from the query string

  if (!query) {
    return res.status(400).json({ message: 'Please provide a search query.' });
  }

  try {
    // Search for users by name or email (case-insensitive)
    const users = await User.find({
      $or: [
        { name: { $regex: query, $options: 'i' } }, // Case-insensitive search for name
        { email: { $regex: query, $options: 'i' } }  // Case-insensitive search for email
      ]
    });

    if (users.length === 0) {
      return res.status(404).json({ message: 'No users found matching the search criteria.' });
    }

    // Send the matching users as the response
    res.status(200).json(users);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error while searching for users.' });
  }
});









module.exports = router;
