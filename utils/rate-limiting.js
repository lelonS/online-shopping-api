class TokenBucket {
  constructor(capacity, fillPerSecond) {
    this.capacity = capacity;
    this.tokens = capacity;

    this.fillPerSecond = fillPerSecond;
    this.lastFilled = Date.now();
  }

  refill() {
    // Refill the bucket since lastFilled using the fill rate
    const now = Date.now();
    // Delta in seconds
    const delta = (now - this.lastFilled) / 1000;
    const newTokens = delta * this.fillPerSecond;
    this.tokens = Math.min(this.capacity, this.tokens + newTokens);
    this.lastFilled = now;
  }

  take() {
    // Refill the bucket since lastFilled
    this.refill();
    // If we have enough tokens, take one and return true
    if (this.tokens >= 1) {
      this.tokens -= 1;
      return true;
    }
    // Otherwise, return false
    return false;
  }
}


function rateLimit(fillPerSecond, capacity) {
  // Create a token bucket
  const bucket = new TokenBucket(capacity, fillPerSecond);
  // Return a middleware function
  return (req, res, next) => {
    // If we can take a token from the bucket, call next()
    if (bucket.take()) {
      next();
    } else {
      res.status(429).send({ "message": "Too Many Requests" });
    }
  };
}

export default rateLimit;

