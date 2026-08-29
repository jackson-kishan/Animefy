"use server";
import axios from "axios";

export const apiClient = axios.create({
    baseURL: "http://localhost:8000",
    withCredentials: true,
    withXSRFToken: true,
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
    xsrfCookieName: "XSRF-TOKEN",
    xsrfHeaderName: "X-XSRF-TOKEN",
  });

// Fetch anime data from the backend API
export const getAnimes = async () => {
  const data = await fetch(`${process.env.APP_URL}/animes`);
  const json = await data.json(); 
  return json;
}

export const getGenres = async () => {
  const genresData = await axios.get(`${process.env.APP_URL}/api/v1/genres`);
  return genresData.data;
}