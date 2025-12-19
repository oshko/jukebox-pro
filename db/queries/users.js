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
  } = await db.query(sql, [username, hashedPassword]);
  return user;
}

export async function getUserById(id) {
  const {
    rows: [user],
  } = await db.query(
    `
    SELECT * FROM users
    WHERE id = $1
        `,
    [id]
  );
  return user;
}

export async function loginByUsernamePassword({ username, password }) {
  const {
    rows: [user],
  } = await db.query(
    `
    SELECT * FROM users
    WHERE username = $1
        `,
    [username]
  );
  if (!user) return "There is no user registered!";
  const isValidPass = await bcrypt.compare(password, user.password);
  if (!isValidPass) return "Password is not right!";
  return user;
}
