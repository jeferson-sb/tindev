const express = require('express');
const DevController = require('./controllers/DevController');
const LikeController = require('./controllers/LikeController');
const DislikeController = require('./controllers/DislikeController');
const router = express.Router();

router.get('/devs', DevController.index);
router.post('/devs', DevController.store);
router.post('/devs/:id/likes', LikeController.store);
router.post('/devs/:id/dislikes', DislikeController.store);

module.exports = router;
