import {Router} from "express"
import { getAllLocations } from "../controllers/location.controller.js";

const router = Router();

router.get('/', getAllLocations)

export default router;

