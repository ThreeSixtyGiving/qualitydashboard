const CACHE_PREFIX = "dqd-cache:";
const DEFAULT_MAX_AGE = 24 * 60 * 60 * 1000; // datastore data only updates once a day

function readCache(cacheKey) {
  try {
    return JSON.parse(window.localStorage.getItem(cacheKey));
  } catch (error) {
    return null;
  }
}

function writeCache(cacheKey, data) {
  try {
    window.localStorage.setItem(cacheKey, JSON.stringify({ data, timestamp: Date.now() }));
  } catch (error) {
    // localStorage may be full or unavailable (e.g. private browsing)
  }
}

const inFlightRequests = new Map();

export default function cachedFetch(url, { maxAge = DEFAULT_MAX_AGE } = {}) {
  const cacheKey = CACHE_PREFIX + url;
  const cached = readCache(cacheKey);

  if (cached && Date.now() - cached.timestamp < maxAge) {
    return Promise.resolve(cached.data);
  }

  if (inFlightRequests.has(url)) {
    return inFlightRequests.get(url);
  }

  const request = fetch(url)
    .then((response) => {
      if (!response.ok) {
        throw new Error(`Request to ${url} failed with status ${response.status}`);
      }
      return response.json();
    })
    .then((data) => {
      writeCache(cacheKey, data);
      return data;
    })
    .catch((error) => {
      if (cached) {
        console.warn(`Datastore request to ${url} failed, using cached data:`, error);
        return cached.data;
      }
      throw error;
    })
    .finally(() => {
      inFlightRequests.delete(url);
    });

  inFlightRequests.set(url, request);
  return request;
}
