import { apiClient } from "./client";

export const spotifyApi = {
  getTracks: () => apiClient.get("/"),
  get10danceableSongs: () => apiClient.get("/10danceableSongs"),
  getAcousticnessPerYear: () => apiClient.get("/acousticness-per-year"),
  getTracksPerYear: () => apiClient.get("/tracks-per-author"),
};
