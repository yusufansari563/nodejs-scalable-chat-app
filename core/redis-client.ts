import Redis from "ioredis";

function init() {
  const redis = new Redis();
  return redis;
}

export default init;
