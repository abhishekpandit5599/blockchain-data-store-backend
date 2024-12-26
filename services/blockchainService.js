require("dotenv").config();
const { ethers } = require("ethers");

const abi = [
    {
        "inputs": [
            { "internalType": "string", "name": "name", "type": "string" },
            { "internalType": "string", "name": "email", "type": "string" },
            { "internalType": "string", "name": "content", "type": "string" }
        ],
        "name": "saveData",
        "outputs": [],
        "stateMutability": "nonpayable",
        "type": "function"
    },
    {
        "inputs": [],
        "name": "getAllData",
        "outputs": [
            {
                "components": [
                    { "internalType": "string", "name": "name", "type": "string" },
                    { "internalType": "string", "name": "email", "type": "string" },
                    { "internalType": "string", "name": "content", "type": "string" }
                ],
                "internalType": "struct DataStorage.Data[]",
                "name": "",
                "type": "tuple[]"
            }
        ],
        "stateMutability": "view",
        "type": "function"
    },
    {
        "inputs": [
            { "internalType": "string", "name": "name", "type": "string" },
            { "internalType": "string", "name": "email", "type": "string" }
        ],
        "name": "getDataByFilter",
        "outputs": [
            {
                "components": [
                    { "internalType": "string", "name": "name", "type": "string" },
                    { "internalType": "string", "name": "email", "type": "string" },
                    { "internalType": "string", "name": "content", "type": "string" }
                ],
                "internalType": "struct DataStorage.Data[]",
                "name": "",
                "type": "tuple[]"
            }
        ],
        "stateMutability": "view",
        "type": "function"
    }
];

const provider = new ethers.providers.JsonRpcProvider(process.env.INFURA_URL);
const wallet = new ethers.Wallet(process.env.PRIVATE_KEY, provider);
const contract = new ethers.Contract(process.env.CONTRACT_ADDRESS, abi, wallet);

module.exports = {
    async saveData(name, email, content) {
        return await contract.saveData(name, email, content);
    },
    async getAllData() {
        return await contract.getAllData();
    },
    async getDataByFilter(name, email) {
        return await contract.getDataByFilter(name, email);
    },
    async getFiltedData(name, email) {
        const data = await contract.getAllData();
        
        // Filter based on name and/or email
        const filteredData = data.filter(item => {
            const [dataName, dataEmail, content] = item;
            
            // Check if name and email match, or if one is missing
            const nameMatch = name ? dataName.toLowerCase().includes(name.toLowerCase()) : true;
            const emailMatch = email ? dataEmail.toLowerCase().includes(email.toLowerCase()) : true;
            
            return nameMatch && emailMatch;
        });
    
        return filteredData;
    }
};
