require('dotenv').config();
const app = require('./app');
const connectDB = require('./config/db');

// Start server function
const startServer = async () => {
  try {
    // Connect to database first
    await connectDB();
    
    // Start server only after database connection is successful
    const PORT = process.env.PORT || 5000;
    app.listen(PORT, () => {
      console.log(`Server running in ${process.env.NODE_ENV} mode on port ${PORT}`);
    });

  } catch (error) {
    console.error('Failed to start server:', error.message);
    process.exit(1);
  }
};

// Start the server
startServer();
