const router = require("express").Router();
const DevController = require("./controllers/DevController");
const LikeController = require("./controllers/LikeController");
const DislikeController = require("./controllers/DislikeController");

router.get("/devs", DevController.index);
router.post("/devs", DevController.store);
router.post("/devs/:id/likes", LikeController.store);
router.post("/devs/:id/dislikes", DislikeController.store);

module.exports = router;
