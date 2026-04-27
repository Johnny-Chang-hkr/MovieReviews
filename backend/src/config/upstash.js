import { Ratelimit } from "@upstash/ratelimit"; // Corrected casing
import { Redis } from "@upstash/redis";
import dotenv from "dotenv";

dotenv.config(); // Ensure your .env variables are loaded

// Create a ratelimiter that allows 10 requests per 20 sec
const ratelimit = new Ratelimit({
  redis: Redis.fromEnv(),
  limiter: Ratelimit.slidingWindow(10, "20 s"), // Use "Ratelimit" consistently
});

export default ratelimit;