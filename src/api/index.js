import { apiClient } from "./client";

export const spotifyApi = {
  getTracks: () => apiClient.get("/"),
  get10danceableSongs: () => apiClient.get("/top-10-party-tracks"),
  getAcousticnessPerYear: () => apiClient.get("/acousticness-per-year"),
};
