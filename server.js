require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

// Routes Import
const userRoutes = require('./routes/userRoutes');
const taskRoutes = require('./routes/taskRoutes');
const birthdayRoutes = require("./routes/birthday.js");
const alluserRoutes = require("./routes/alluser.js");
const specialRoutes = require("./routes/special.js");


const app = express();

// Middleware
app.use(cors());
app.use(express.json());

app.use(express.json({ limit: "5mb" })); // मोठं JSON payload handle करण्यासाठी

// MongoDB connect
mongoose.connect(process.env.MONGO_URI, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
    })
    .then(() => console.log('✅ DB Connected'))
    .catch(err => console.error('❌ DB Error:', err));

// Routes setup
app.use('/api/users', userRoutes);
app.use('/api/tasks', taskRoutes);
app.use("/api/birthdays", birthdayRoutes);
app.use('/api/a', alluserRoutes); // Birthday routes
app.use('/api/special', specialRoutes); // Special routes



// Start server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));