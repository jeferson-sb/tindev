import { Router } from 'express'
import DevController from './controllers/DevController.js'
import LikeController from './controllers/LikeController.js'
import DislikeController from './controllers/DislikeController.js'

const router = Router();

router.get("/devs", DevController.index);
router.post("/devs", DevController.store);
router.post("/devs/:id/likes", LikeController.store);
router.post("/devs/:id/dislikes", DislikeController.store);

export default router;
