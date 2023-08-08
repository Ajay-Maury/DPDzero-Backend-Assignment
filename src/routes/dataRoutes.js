const express = require('express');
const DataController = require('../controllers/DataController');
const authenticateToken = require('../middleware/authenticateToken');
const router = express.Router();

router.post('/data', authenticateToken, DataController.storeData);
router.get('/data/:key', authenticateToken, DataController.retrieveData);
router.put('/data/:key', authenticateToken, DataController.updateData);
router.delete('/data/:key', authenticateToken, DataController.deleteData);

module.exports = router;

