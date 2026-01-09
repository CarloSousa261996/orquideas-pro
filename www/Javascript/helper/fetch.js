export async function fetchJson(url, method = "GET", body) {
  let options = {
    method: method,
    headers: {
      Accept: "application/json",
    },
  };
  if (body) {
    options.body = JSON.stringify(body);
    options.headers["Content-Type"] = "application/json";
  }
  try {
    let response = await fetch(url, options);
    return response.ok ? await response.json() : void 0;
  } catch (error) {
    return void 0;
  }
}
