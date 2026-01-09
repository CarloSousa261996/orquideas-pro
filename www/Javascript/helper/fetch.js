export async function fetchJson(url, options = {}) {
  const defaultOptions = {
    method: options.method || "GET",
    headers: {
      Accept: "application/json",
      ...options.headers,
    },
  };

  // If body is FormData, don't set Content-Type (browser handles it)
  if (options.body instanceof FormData) {
    delete defaultOptions.headers["Content-Type"];
    defaultOptions.body = options.body;
  } else if (options.body) {
    defaultOptions.body = JSON.stringify(options.body);
    defaultOptions.headers["Content-Type"] = "application/json";
  }

  try {
    const response = await fetch(url, defaultOptions);
    if (!response.ok) {
      const errorData = await response.json().catch(() => ({ error: response.statusText }));
      throw new Error(errorData.error || `HTTP ${response.status}`);
    }
    return await response.json();
  } catch (error) {
    console.error("Fetch error:", error);
    throw error;
  }
}
