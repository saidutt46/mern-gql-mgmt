const express = require('express');
const colors = require('colors');
const cors = require('cors');   
require('dotenv').config();
const { graphqlHTTP } = require('express-graphql');

const port = process.env.PORT || 5000;
const connectDB = require('./server/config/db');
const schema = require('./server/schema/schema');
const path = require('path');

const app = express();

// Connect to MongoDB
connectDB();

app.use(cors());

app.use('/graphql', graphqlHTTP({
    schema,
    graphiql: process.env.NODE_ENV === 'development'
}));

// serve static assets if in prod mode
if (process.env.NODE_ENV === "production") {
    // set static folder
    app.use(express.static("client/build"));
    app.get("*", (req, res) => {
      res.sendFile(path.resolve(__dirname, "client", "build", "index.html"));
    });
}

app.listen(port, () => console.log(`Server running on port: ${port}`.blue.underline.bold));