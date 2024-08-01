import Redis from "ioredis";

export const redisClient = new Redis({
  host: process.env.REDIS_STORE_HOST as string,
  port: parseInt(process.env.REDIS_STORE_PORT as string),
});
