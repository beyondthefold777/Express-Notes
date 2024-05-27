const express = require('express');
const html_routes = require('./routes/html-routes');
const api_routes = require('./routes/api-routes');
const path = require('path');

const PORT = process.env.PORT || 5500;
const app = express();

// Setting up express middleware for our application
app.use(express.urlencoded({ extended: false }));
app.use(express.json());

// Serve static files from the "public" directory
app.use(express.static(path.join(__dirname, "public")));

// Define routes for HTML and API endpoints
app.use('/', html_routes);
app.use('/api', api_routes);

// Error handling for module not found
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send('Something broke!');
});

app.listen(PORT, () =>
  console.log(`App listening at http://localhost:${PORT} 🚀`)
);