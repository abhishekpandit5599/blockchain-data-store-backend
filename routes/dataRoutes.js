const express = require("express");
const router = express.Router();
const dataController = require("../controllers/dataController");
const authMiddleware = require("../middlewares/authMiddleware");

router.post("/save", authMiddleware, dataController.saveData);
router.get("/fetchAll", dataController.fetchAllData);
router.post("/fetchByFilter", authMiddleware, dataController.fetchDataByFilter);

module.exports = router;
