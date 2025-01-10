import axios from 'axios';

const BASE_URL = 'http://localhost:8000';

export const spotifyApi = {
  // Analyses temporelles
  getSongsByYear: async () => {
    const response = await axios.get(`${BASE_URL}/songs-by-year`);
    return response.data;
  },

  getArtistByYear: async (year) => {
    const response = await axios.get(`${BASE_URL}/artist/${year}`);
    return response.data;
  },

  // Analyses musicales
  getAcousticnessPerYear: async () => {
    const response = await axios.get(`${BASE_URL}/acousticness-per-year`);
    return response.data;
  },

  getDanceabilityPerYear: async () => {
    const response = await axios.get(`${BASE_URL}/danceability-per-year`);
    return response.data;
  },

  getDanceabilityAndValence: async () => {
    const response = await axios.get(`${BASE_URL}/danceability-and-valence`);
    return response.data;
  },

  getPopularityVsTempo: async () => {
    const response = await axios.get(`${BASE_URL}/popularity-vs-tempo`);
    return response.data;
  },

  getPopularityPerLanguage: async () => {
    const response = await axios.get(`${BASE_URL}/popularity-per-language`);
    return response.data;
  },

  // Top 10
  getTop10Popular: async () => {
    const response = await axios.get(`${BASE_URL}/top-10-popular`);
    return response.data;
  },

  getTop10Dance: async () => {
    const response = await axios.get(`${BASE_URL}/top-10-dance`);
    return response.data;
  },

  getTop10Relaxing: async () => {
    const response = await axios.get(`${BASE_URL}/top-10-relaxing`);
    return response.data;
  },

  getTop10Longest: async () => {
    const response = await axios.get(`${BASE_URL}/top-10-longest`);
    return response.data;
  },

  //Mode
  getMode: async () => {
    const response = await axios.get(`${BASE_URL}/mode`);
    return response.data;
  },

  //key
  getKey: async () => {
    const response = await axios.get(`${BASE_URL}/key`);
    return response.data;
  }
};
