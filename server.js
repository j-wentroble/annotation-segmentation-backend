const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const annotationRoutes = require('./routes/annotations');

// Initialize app and middleware
const app = express();
app.use(bodyParser.json());

// Connect to MongoDB
mongoose.connect('mongodb://localhost/yembo', { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log('MongoDB connected'))
  .catch(err => console.error(err));

// Routes
app.use('/annotations', annotationRoutes);

// Start server
const PORT = 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
