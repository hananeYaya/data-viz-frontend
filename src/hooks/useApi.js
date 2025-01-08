import { useQuery } from "@tanstack/react-query";
import { spotifyApi } from "../api";

export const useSpotifyData = () => {
  return useQuery({
    queryKey: ["tracks"],
    queryFn: spotifyApi.getTracks,
  });
};

export const useTop10Danceable = () => {
  return useQuery({
    queryKey: ["10danceableSongs"],
    queryFn: spotifyApi.get10danceableSongs,
  });
};

export const useAcousticnessYear = () => {
  return useQuery({
    queryKey: ["acousticnessPerYear"],
    queryFn: spotifyApi.getAcousticnessPerYear,
  });
};

export const useDanceabilityPerYear = () => {
  return useQuery({
    queryKey: ["danceabilityPerYear"],
    queryFn: spotifyApi.getDanceabilityPerYear,
  });
};
