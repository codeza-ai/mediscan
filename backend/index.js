const express = require('express');
const cors = require('cors');

const app = express();
const PORT = process.env.PORT || 3000;
const dotenv = require('dotenv');
// Load environment variables from .env file
dotenv.config();
// Allow CORS for all origins
app.use(cors(
    true
));

// Parse JSON request bodies
app.use(express.json());

const router = require('./routes/index.route');
app.use('/api', router);

// Start the server
function main(){
    app.listen(PORT, () => {
        console.log(`Server is running on port ${PORT}`);
    });
}

main();