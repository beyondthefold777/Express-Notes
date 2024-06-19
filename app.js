const express = require('express');
const htmlRoutes = require('./routes/html-routes');
const apiRoutes = require('./routes/api-routes');
const path = require('path');
const app = express();
const PORT = process.env.PORT || 3001;

// Middleware setup
app.use(express.urlencoded({ extended: false }));
app.use(express.json());
// changed this since render searches for files in the build directory
app.use(express.static(path.join(__dirname, 'public')));

// Routes setup
app.use("/", htmlRoutes);
app.use("/api", apiRoutes); // Changed route path to /api

// Route to serve the 'index.html' file from the public directory
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

// Route to serve the 'notes.html' file from the public directory
app.get('/notes', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'notes.html'));
});

// Handle 404 (Not Found) errors
app.use((req, res) => {
    res.status(404).send('404 - Not Found');
});

// Start the server
app.listen(PORT, () =>
    console.log(`App listening at http://localhost:${PORT} 🚀`)
);
