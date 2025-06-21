const express = require('express');
const path = require('path');
require('dotenv').config();

const app = express();
const session = require('express-session');

// Middleware
app.use(express.json());
app.use(express.static(path.join(__dirname, '/public')));
app.use(express.urlencoded({ extended: true }));

app.use(session({
    secret: 'newkey123',    // Temporary keys for development
    resave: false,
    saveUninitialized: false
}
));

// Routes
const walkRoutes = require('./routes/walkRoutes');
const userRoutes = require('./routes/userRoutes');
const loginRoutes = require('./routes/loginRoutes');
const logoutRoutes = require('./routes/logoutRoutes');
const ownerRoutes = require('./routes/ownerRoutes');

app.use('/api/walks', walkRoutes);
app.use('/api/users', userRoutes);
app.use('/login', loginRoutes);
app.use('/logout', logoutRoutes);
app.use('/api/owner', ownerRoutes);

// Export the app instead of listening here
module.exports = app;