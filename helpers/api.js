import axios from "axios";

export default axios.create({
  headers: {
    "Content-Type": "application/json",
  },
  baseURL: "http://172.17.64.1/api",
});
