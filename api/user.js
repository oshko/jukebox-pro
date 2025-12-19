import { createUser, loginByUsernamePassword } from "#db/queries/users";
import { createToken } from "#utils/jwt";
import express from "express";
import requiredBody from "#middleware/requireBody";
const router = express.Router();

router.post(
  "/register",
  requiredBody(["username", "password"]),
  async (req, res) => {
    const { username, password } = req.body;
    const userData = await createUser({ username, password });
    const token = createToken({ id: userData.id });
    res.status(201).send(token);
  }
);

router.post(
  "/login",
  requiredBody(["username", "password"]),
  async (req, res) => {
    const { username, password } = req.body;
    const userData = await loginByUsernamePassword({ username, password });
    if (!userData) return res.status(401).send("Invalid email or password.");
    const token = createToken({ id: userData.id });
    res.send(token);
  }
);

export default router;
