const express = require('express');
const router = express.Router();
const  {sendmessage ,getMessage}  = require('../controlers/message.controler'); // Corrected file name spelling
const protectedRoute = require('../middleware/protectroute.middleware');

router.route('/:id').get(protectedRoute,getMessage); // Added a slash between 'send' and ':id'
router.route('/send/:id').post(protectedRoute,sendmessage); // Added a slash between 'send' and ':id'

module.exports = router;
