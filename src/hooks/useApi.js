import { useQuery } from "@tanstack/react-query";
import { spotifyApi } from "../api";

// Analyses temporelles
export const useTracksByYear = () => {
  return useQuery({
    queryKey: ["tracksByYear"],
    queryFn: spotifyApi.getSongsByYear,
  });
};

export const useTracksByArtistYear = (year) => {
  return useQuery({
    queryKey: ["tracksByArtistYear", year],
    queryFn: () => spotifyApi.getArtistByYear(year),
    enabled: !!year,
  });
};

// Analyses musicales par année
export const useAcousticnessByYear = () => {
  return useQuery({
    queryKey: ["acousticnessByYear"],
    queryFn: spotifyApi.getAcousticnessPerYear,
  });
};

export const useDanceabilityByYear = () => {
  return useQuery({
    queryKey: ["danceabilityByYear"],
    queryFn: spotifyApi.getDanceabilityPerYear,
  });
};

// Analyses de caractéristiques
export const useDanceabilityAndValence = () => {
  return useQuery({
    queryKey: ["danceabilityAndValence"],
    queryFn: spotifyApi.getDanceabilityAndValence,
  });
};

export const usePopularityByTempo = () => {
  return useQuery({
    queryKey: ["popularityByTempo"],
    queryFn: spotifyApi.getPopularityVsTempo,
  });
};

export const usePopularityByLanguage = () => {
  return useQuery({
    queryKey: ["popularityByLanguage"],
    queryFn: spotifyApi.getPopularityPerLanguage,
  });
};

// Top 10
export const useTop10Popular = () => {
  return useQuery({
    queryKey: ["top10Popular"],
    queryFn: spotifyApi.getTop10Popular,
  });
};

export const useTop10Dance = () => {
  return useQuery({
    queryKey: ["top10Dance"],
    queryFn: spotifyApi.getTop10Dance,
  });
};

export const useTop10Relaxing = () => {
  return useQuery({
    queryKey: ["top10Relaxing"],
    queryFn: spotifyApi.getTop10Relaxing,
  });
};

export const useTop10Longest = () => {
  return useQuery({
    queryKey: ["top10Longest"],
    queryFn: spotifyApi.getTop10Longest,
  });
};
//mode
export const useMode = () => {
  return useQuery({
    queryKey: ["mode"],
    queryFn: spotifyApi.getMode,
  });
};

//key
export const useKey = () => {
  return useQuery({
    queryKey: ["key"],
    queryFn: spotifyApi.getKey,
  });
};
