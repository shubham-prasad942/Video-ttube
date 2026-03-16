import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import { getVideoStats } from "/src/API/api";
import { images } from "/src/assets/images";
import Comment from "./Comment";
import Related from "./Related";

const Video = () => {
  const { id: videoId } = useParams(); 
  const cachedVideo = useSelector((state) => state.video.video);
  const [videoData, setVideoData] = useState(null);
  function formatViews(views) {
    const num = Number(views);
    if (num >= 1_000_000) return (num / 1_000_000).toFixed(1) + "M";
    if (num >= 1_000) return (num / 1_000).toFixed(1) + "K";
    return num.toString();
  }

  function timeAgo(publishedAt) {
    const diff = Date.now() - new Date(publishedAt).getTime();
    const mins = Math.floor(diff / 60000);
    if (mins < 60) return `${mins}m ago`;
    const hrs = Math.floor(mins / 60);
    if (hrs < 24) return `${hrs}h ago`;
    const days = Math.floor(hrs / 24);
    return `${days}d ago`;
  }

  useEffect(() => {
    const fetchVideo = async () => {
      if (
        cachedVideo &&
        (cachedVideo.id === videoId || cachedVideo.id?.videoId === videoId)
      ) {
        setVideoData(cachedVideo);
        return;
      }

      const data = await getVideoStats([videoId]);
      if (data?.length) {
        setVideoData({
          id: videoId,
          snippet: cachedVideo?.snippet,
          statistics: data[0].statistics,
        });
      }
    };

    fetchVideo();
  }, [videoId]);
  if (!videoData) return null;
  const likeCount = formatViews(videoData.statistics?.likeCount || 0);
  const channelId = videoData.snippet?.channelId;
  const titleQuery = videoData.snippet?.title; 

  const actions = [
    { icon: images.like, text: likeCount },
    { icon: images.dislike, text: "Dislike" },
    { icon: images.share, text: "Share" },
    { icon: images.save, text: "Save" },
  ];

  return (
    <div className="flex gap-5 px-5">
      {/* LEFT */}
      <div className="w-[65%]">
        <iframe
          key={videoId}
          className="w-full aspect-video rounded-lg"
          src={`https://www.youtube.com/embed/${videoId}`}
          title={videoData.snippet?.title}
          allowFullScreen
        />

        <h1 className="font-semibold mt-2">{videoData.snippet?.title}</h1>

        <div className="flex justify-between items-center py-2 border-b">
          <p className="text-sm text-gray-500">
            {timeAgo(videoData.snippet?.publishedAt)}
          </p>

          <div className="flex gap-4">
            {actions.map((a, i) => (
              <div key={i} className="flex items-center gap-1 cursor-pointer">
                <img src={a.icon} className="h-5" />
                <span className="text-sm text-gray-500">{a.text}</span>
              </div>
            ))}
          </div>
        </div>

        <Comment value={{ channelId, videoId }} />
      </div>

      {/* RIGHT */}
      <div className="w-[35%]">
        <Related value={titleQuery} />
      </div>
    </div>
  );
};

export default Video;
