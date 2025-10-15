const express = require('express');
const cors = require('cors');

const app = express();
const PORT = process.env.PORT || 3000;
const dotenv = require('dotenv');
const {connectToMongo} = require('./services/mongo.service');
const {getLocalIPAddress, getOutboundIPAddress} = require('./utils');
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
    const localIP = getLocalIPAddress();
    const outboundIP = await getOutboundIPAddress();
    
    app.listen(PORT, () => {
        console.log(`Server is running on port ${PORT}`);
        console.log(`Local: http://localhost:${PORT}`);
        console.log(`Network: http://${localIP}:${PORT}`);
        console.log(`Device IP Address: ${localIP}`);
        console.log(`Outbound IP Address: ${outboundIP}`);
    });
}

main();