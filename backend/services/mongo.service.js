// Connect to mongoDB and export the connection
const mongoose = require('mongoose');
require('dotenv').config();
const Query = require('../models/query');

const connectToMongo = async () => {
    try {
        await mongoose.connect(process.env.MONGO_URI, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        });
        console.log('Connected to MongoDB');
    } catch (error) {
        console.error('Error connecting to MongoDB:', error);
        process.exit(1);
    }
};

const addQueryResponse = async (queryText, conditions, nextSteps, modelType) => {
    try {
        const newEntry = new Query({ queryText, conditions, nextSteps, modelType });
        await newEntry.save();
        return 'Query response added successfully.';
    } catch (error) {
        console.error('Error adding query response:', error);
        return 'Failed to add query response.';
    }
};

const clearHistory = async () => {
    try {
        await Query.deleteMany({});
        return 'History cleared successfully.';
    } catch (error) {
        console.error('Error clearing history:', error);
        return 'Failed to clear history.';
    }
};

const getQueryHistory = async () => {
    try{
        const history = await Query.find().sort({ createdAt: -1 });
        return {history, message: 'History fetched successfully.'};
    }catch(error){
        console.error('Error fetching history:', error);
        return {history: [], message: 'Failed to fetch history.'};
    }
}

module.exports = { connectToMongo, addQueryResponse, clearHistory, getQueryHistory };