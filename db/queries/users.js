import db from "#db/client";
import bcrypt from "bcrypt";

export async function createUser({ username, password }) {
  const sql = `
        INSERT INTO users (username, password)
        VALUES ($1, $2)
        RETURNING *
        `;

  // creating hashed password to save in database
  const hashedPassword = await bcrypt.hash(password, 10);
  const {
    rows: [user],
  } = db.query(sql, [username, password]);
  return user;
}
