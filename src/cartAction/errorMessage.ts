import axios from "axios";

export function errorMessage(error: unknown) {
  return axios.isAxiosError(error)
    ? error.response?.data?.message || "Request failed"
    : "Something went wrong";
}