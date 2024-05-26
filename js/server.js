// declaring all of our dependancies
const express = require('express');
const html_routes = require('./routes/html-routes')
const api_routes = require('./routes/api-routes')
const PORT = process.env.PORT || 3001;
const app = express();

// setting up express middleware for our application
app.use(express.urlencoded({ extended: false}));
app.use(express.json());
app.use(express.static("public"));
app.use(html_routes)
app.use(api_routes)

app.listen(PORT, () => 
    console.log(`App listening at http://localhost:${PORT} 🚀`)
);



