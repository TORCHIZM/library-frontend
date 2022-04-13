import axios from "axios";

export default axios.create({
  headers: {
    "Content-Type": "application/json",
  },
  baseURL: "http://172.29.192.1/api",
});
