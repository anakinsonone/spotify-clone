import session from "express-session";
import IORedis from "ioredis";
import RedisStore from "connect-redis";

const prod = process.env.NODE_ENV === "production";
const redisClient = new IORedis(
  process.env.REDIS_STORE_URL || "redis://127.0.0.1:6379",
);
const redisStore = new RedisStore({ client: redisClient });

export const redisSession = session({
  store: redisStore,
  secret: process.env.SESSION_SECRET as string,
  resave: false,
  saveUninitialized: false,
  cookie: {
    secure: prod,
    httpOnly: prod,
    maxAge: 1 * 24 * 60 * 60 * 1000,
  },
});
