/**
 * Busca uma resposta JSON da URL fornecida com as opções fornecidas.
 * As opções padrão são:
 * - method: GET
 * - headers: { Accept: "application/json" }
 * Se o body for um FormData, não define o header Content-Type.
 * Se o body não for um FormData, será JSON.stringified e definido como o corpo da requisição com um header Content-Type de "application/json".
 * @param {string} url - A URL para buscar.
 * @param {object} options - As opções a usar ao buscar.
 * @returns {Promise<object>} - Uma promessa que se resolve com a resposta JSON.
 */
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
      throw errorData;
    }
    return await response.json();
  } catch (error) {
    console.error("Fetch error:", error);
    throw error;
  }
}
