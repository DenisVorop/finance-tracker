import axios from "axios";

export function createHttpClient(baseURL: string) {
  return axios.create({
    timeout: 15_000,
    responseType: "json",
    headers: {
      "X-Requested-With": "XMLHttpRequest",
      "Content-Type": "application/json",
      Accept: "application/json",
    },
    baseURL,
    withCredentials: true,
  });
}
