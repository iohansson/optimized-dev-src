/**
 * 🐔 "This file acts as a simple database API. It reads and writes files to a
 *     JSON file directly in the project."
 *
 * 🐔 "Hey, listen up! The database might not work if you deploy the app to
 *     serverless hosts, like Vercel (actually, it most definitely won't). It
 *     should work locally on your computer, however. I left an egg for you a
 *     couple of lines below... this... line."
 *
 * 🥚 Idea: For a challenge, try replacing this filesystem-based database with
 *          something hosted, like Supabase or Planetscale.
 */
import { db } from "../db/db.ts";

/**
 * Loads the database of saved feed items.
 *
 * If the database does not exist, it creates an empty database.
 */
export const loadAll = async () => {
  return (await db()).items.findAll({
    order: [
      ['pubDate', 'DESC'],
    ],
    raw: true,
  });
};

/**
 * Inserts a new item to the database of saved feed items. Upon insertion, the
 * database is sorted by items's publication date using `dayjs`.
 */
export const insert = async (row) => {
  return (await db()).items.create(row);
};

/**
 * Removes an item from the database of saved feed items.
 */
export const remove = async (guid) => {
  return (await db()).items.destroy({
    where: {
      guid,
    },
  });
};
