import axios from "axios";

export function createHttpClient(baseURL: string) {
  return axios.create({
    timeout: 5000,
    responseType: "json",
    headers: {
      "X-Requested-With": "XMLHttpRequest",
      "Content-Type": "application/json",
      Accept: "application/json",
    },
    baseURL,
  });
}
