const PREFIX = 'f1-data-garage:';
const memoryCache = new Map();
const pendingRequests = new Map();

const read = (key) => {
  const memory = memoryCache.get(key);
  if (memory && memory.expiresAt > Date.now()) return memory.value;

  try {
    const stored = sessionStorage.getItem(`${PREFIX}${key}`);
    if (!stored) return undefined;
    const entry = JSON.parse(stored);
    if (entry.expiresAt <= Date.now()) {
      sessionStorage.removeItem(`${PREFIX}${key}`);
      return undefined;
    }
    memoryCache.set(key, entry);
    return entry.value;
  } catch {
    return undefined;
  }
};

const write = (key, value, ttl) => {
  const entry = { value, expiresAt: Date.now() + ttl };
  memoryCache.set(key, entry);
  try {
    sessionStorage.setItem(`${PREFIX}${key}`, JSON.stringify(entry));
  } catch {
    // sessionStorage is an optional optimization; memory cache still works.
  }
  return value;
};

export async function cachedRequest(key, ttl, request, { force = false } = {}) {
  if (!force) {
    const cached = read(key);
    if (cached !== undefined) return cached;
  }

  if (pendingRequests.has(key)) return pendingRequests.get(key);

  const pending = Promise.resolve()
    .then(request)
    .then((value) => write(key, value, ttl))
    .finally(() => pendingRequests.delete(key));
  pendingRequests.set(key, pending);
  return pending;
}

export function clearCachedRequest(key) {
  memoryCache.delete(key);
  try {
    sessionStorage.removeItem(`${PREFIX}${key}`);
  } catch {
    // No browser storage available.
  }
}
