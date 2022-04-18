import axios from "axios";

export default axios.create({
  headers: {
    "Content-Type": "application/json",
  },
  baseURL: "http://172.27.0.1/api",
});
