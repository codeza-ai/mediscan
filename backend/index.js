const express = require('express');
const cors = require('cors');

const app = express();
const PORT = process.env.PORT || 3000;
const dotenv = require('dotenv');
const {connectToMongo} = require('./services/mongo.service');

// Load environment variables from .env file
dotenv.config();

// Allow origin requests from specified domains
app.use(cors({
    origin: [
        process.env.CLIENT_BASE_URL
    ]
}));

// Parse JSON request bodies
app.use(express.json());

const router = require('./routes/index.route');
app.use('/api', router);

// Start the server
async function main(){
    await connectToMongo();
    app.listen(PORT, () => {
        console.log(`Server is running on port ${PORT}`);
    });
}

main();