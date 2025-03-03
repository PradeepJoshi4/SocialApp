const bcrypt = require('bcryptjs');
const mongoose = require('mongoose');
const User = require('./models/User'); // Adjust the path if necessary

// Connect to your MongoDB
mongoose.connect('mongodb://localhost:27017/user_credentials', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
  .then(async () => {
    // Admin user details
    const password = 'adminPassword'; // Admin password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create admin user
    const adminUser = new User({
      name: 'Admin User',
      email: 'admin@example.com',
      password: hashedPassword, // Store the hashed password
      role: 'admin',
    });

    // Save to database
    await adminUser.save();

    console.log('Admin user created!');
    mongoose.disconnect(); // Close the DB connection
  })
  .catch((err) => console.error('Error connecting to MongoDB:', err));
