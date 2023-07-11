const router = require('express').Router();
const pythonController = require('../controllers/pythonController.js');



router.post('/run', pythonController.runPython);


module.exports = router;
