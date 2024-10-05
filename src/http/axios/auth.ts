import axios from "axios";
import { authApiUrl } from "../../utils/constants/envs";

export const api = axios.create({
  baseURL: authApiUrl,
  headers: {
    "Content-Type": "application/json",
  },
});
