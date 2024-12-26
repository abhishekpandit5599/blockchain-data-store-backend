const blockchainService = require("../services/blockchainService");
const errorMessages = require("../config/errorMessages");
const successMessages = require("../config/successMessages");

module.exports = {
    async saveData(req, res) {
        const { name, email, data } = req.body;
        try {
            await blockchainService.saveData(name, email, data);
            res.status(200).json({ message: successMessages.DATA_SAVED });
        } catch (error) {
            res.status(500).json({ error: errorMessages.DATA_SAVE_FAILED });
        }
    },
    async fetchAllData(req, res) {
        try {
            const data = await blockchainService.getAllData();
            res.status(200).json({ message: successMessages.DATA_FETCHED, data });
        } catch (error) {
            res.status(500).json({ error: errorMessages.DATA_FETCH_FAILED });
        }
    },
    async fetchDataByFilter(req, res) {
        const { name, email } = req.body;
        try {
            const data = await blockchainService.getFiltedData(name, email);
            
            // If no data found, return a different message
            if (data.length === 0) {
                return res.status(404).json({ message: "No data found matching the filter criteria" });
            }
    
            res.status(200).json({ message: successMessages.DATA_FETCHED, data });
        } catch (error) {
            console.error(error);  // Optionally log the error for debugging
            res.status(500).json({ error: errorMessages.DATA_FETCH_FAILED });
        }
    },
};
