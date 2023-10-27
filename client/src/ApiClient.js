const BASE_API_URL =
  process.env.REACT_APP_BACKEND_API_URL || "http://localhost:5001";

/**
 * A class representing a Todo API client.
 */
export default class TodoApiClient {
  /**
   * Creates a new instance of TodoApiClient.
   */
  constructor() {
    this.base_url = BASE_API_URL;
  }

  /**
   * Sends a request to the server.
   * @param {Object} options - The request options.
   * @param {string} options.url - The request URL.
   * @param {string} options.method - The request method.
   * @param {Object} options.headers - The request headers.
   * @param {Object} options.query - The request query parameters.
   * @param {Object} options.body - The request body.
   * @returns {Object} - The response object.
   */
  async request(options) {
    let query = new URLSearchParams(options.query || {}).toString();
    if (query !== "") {
      query = "?" + query;
    }

    let response;
    try {
      response = await fetch(this.base_url + options.url + query, {
        method: options.method,
        headers: {
          "Content-Type": "application/json",
          ...options.headers,
        },
        credentials: "include",
        body: options.body ? JSON.stringify(options.body) : null,
      });
    } catch (error) {
      response = {
        ok: false,
        status: 500,
        json: async () => {
          return {
            code: 500,
            message: "The server is unresponsive",
            description: error.toString(),
          };
        },
      };
    }

    return {
      ok: response.ok,
      status: response.status,
      body: response.status !== 204 ? await response.json() : null,
    };
  }

  /**
   * Sends a GET request to the server.
   * @param {string} url - The request URL.
   * @param {Object} query - The request query parameters.
   * @param {Object} options - The request options.
   * @returns {Object} - The response object.
   */
  async get(url, query, options) {
    return this.request({ method: "GET", url, query, ...options });
  }

  /**
   * Sends a POST request to the server.
   * @param {string} url - The request URL.
   * @param {Object} body - The request body.
   * @param {Object} options - The request options.
   * @returns {Object} - The response object.
   */
  async post(url, body, options) {
    return this.request({ method: "POST", url, body, ...options });
  }

  /**
   * Sends a PUT request to the server.
   * @param {string} url - The request URL.
   * @param {Object} body - The request body.
   * @param {Object} options - The request options.
   * @returns {Object} - The response object.
   */
  async put(url, body, options) {
    return this.request({ method: "PUT", url, body, ...options });
  }

  /**
   * Sends a DELETE request to the server.
   * @param {string} url - The request URL.
   * @param {Object} options - The request options.
   * @returns {Object} - The response object.
   */
  async delete(url, options) {
    return this.request({ method: "DELETE", url, ...options });
  }

  /**
   * Sends a PATCH request to the server.
   * @param {string} url - The request URL.
   * @param {Object} body - The request body.
   * @param {Object} options - The request options.
   * @returns {Object} - The response object.
   */
  async patch(url, body, options) {
    return this.request({ method: "PATCH", url, body, ...options });
  }
}
