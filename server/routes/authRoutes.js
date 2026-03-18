import express from "express";
import { register, login } from "../controllers/authController.js";
import { validate } from "../middlewares/validate.js";
import { loginConstraints, registerConstraints } from "../validators/authValidator.js";

const router = express.Router();

router.post("/register", validate(registerConstraints), register);
router.post("/login", validate(loginConstraints),login);

export default router;
