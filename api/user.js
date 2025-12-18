import { createUser } from "#db/queries/users";
import { createToken } from "#utils/jwt";
import express from "express";
import requiredBody from "#middleware/requireBody";
const router = express.Router();

router.post(
  "/register",
  requireBody(["username", "password"]),
  async (req, res) => {
    const { username, password } = req.body;
    const userData = createUser({ username, password });
    const token = createToken({ id: userData.id });
    res.status(201).send(token);
  }
);
