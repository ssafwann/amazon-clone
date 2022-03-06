// axios is a popular fetch library
// fetch, post requests and lets u interact with apis

import axios from "axios";

const instance = axios.create({
  baseURL: "https://us-central1-clone-66761.cloudfunctions.net/api",
  // "http://localhost:5001/clone-66761/us-central1/api ", // THE API {cloud function} URL
});

export default instance;
