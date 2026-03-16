const url = "https://www.googleapis.com/youtube/v3/search";
const randomUrl = "https://www.googleapis.com/youtube/v3/videos";
const channelUrl = "https://www.googleapis.com/youtube/v3/channels";
const commentUrl = "https://www.googleapis.com/youtube/v3/commentThreads";
const statsUrl = "https://www.googleapis.com/youtube/v3/videos";
const apiKey = import.meta.env.VITE_YOUTUBE_API_KEY;
import axios from "axios";

export const getSearchData = async (query: string) => {
  try {
    const res = await axios.get(url, {
      params: {
        q: query,
        type: "video",
        key: apiKey,
        maxResults: 12,
        part: "snippet",
      },
    });
    return res.data.items;
  } catch (err) {
    console.log("err is", err);
  }
};

export const getRandomData = async (catId:string) => {
  try {
    const res = await axios.get(randomUrl, {
      params: {
        key: apiKey,
        maxResults: 12,
        part: "snippet,statistics",
        chart: "mostPopular",
        regionCode: "IN",
        videoCategoryId: catId
      },
    });
    return res.data.items;
  } catch (err) {
    console.log("err is", err);
    return [];
  }
};

export const getChannelData = async (channelId: string) => {
  try {
    const res = await axios.get(channelUrl, {
      params: {
        key: apiKey,
        part: "snippet,statistics",
        id: channelId,
      },
    });
    return res.data.items[0];
  } catch (err) {
    console.log("err is", err);
  }
};

export const getCommentData = async (videoId: string) => {
  try {
    const res = await axios.get(commentUrl, {
      params: {
        key: apiKey,
        part: "snippet",
        videoId,
        maxResults: 20, 
        order: "relevance",
         textFormat: "plainText",
      },
    });
    return res.data.items;
  } catch (err) {
    console.log("err is", err);
  }
};

export const getVideoStats = async (ids: string[]) => {
  try {
    const res = await axios.get(statsUrl, {
      params: {
        key: apiKey,
        part: "statistics",
        id: ids.join(","), 
      },
    });
    return res.data.items;
  } catch (err) {
    console.log("Error fetching video stats:", err);
    return [];
  }
};
