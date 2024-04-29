require('dotenv').config()
const express = require('express');
const path = require('path');
const cors = require('cors');
const app = express();
const userRoutes = require('./routes/userRoutes')
const mongoose = require('mongoose')

app.use(cors());

// Define the path to the public directory
const publicPath = path.resolve(__dirname, '../Frontend');

// Serve static files from the public directory
app.use(express.static(publicPath));

app.use(express.json())

app.use('/auth', userRoutes)

// Define a route to serve the index.html file
app.get('/', (req, res) => {
    res.sendFile(path.join(publicPath, 'home.html'));
});

app.get('/', (req, res) => {
    res.sendFile(path.join(publicPath, 'home.html'));
});

// Define a separate route to send extra data as JSON
app.get('/data', (req, res) => {
    // Extra data to be sent as JSON response
    const extraData = {
        Client_ID: process.env.CLIENT_ID
    };

    // Send the extra data as JSON response
    res.json(extraData);
});

// Start the server
mongoose.connect(process.env.MONGO_URI)
    .then(() => {
        console.log('connected to database')
        // listen to port
        app.listen(process.env.PORT, () => {
            console.log('listening for requests on port', process.env.PORT)
        })
    })
    .catch((err) => {
        console.log(err)
    })
