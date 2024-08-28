import Redis from "ioredis";

function init() {
  const redis = new Redis({
    host: 'host.docker.internal',
    port: 6379
  });
  return redis;
}

export default init;
