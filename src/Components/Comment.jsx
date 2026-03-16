import { useEffect, useState } from "react";
import { getChannelData } from "../API/api";
import Reactions from "./Reactions";

const Comment = ({ value }) => {
  const { channelId } = value;
  const { videoId } = value;
  const [channelInfo, setChannelInfo] = useState(null);
  const formatViews = (views) => {
    const num = Number(views);
    if (num >= 1000000) return (num / 1000000).toFixed(1) + "M";
    if (num >= 1000) return (num / 1000).toFixed(1) + "K";
    return num.toString();
  };
  useEffect(() => {
    if (!channelId) return;
    const handelChannelData = async () => {
      const data = await getChannelData(channelId);
      setChannelInfo(data);
    };
    handelChannelData();
  }, [channelId]);
  if (!channelInfo) return;
  return (
    <div className="main">
      <div className="items-center flex justify-between my-1 py-2 shadow-xl bg-[white] w-full">
        <div className="left flex gap-2 items-center-safe">
          <div>
            <img
              src={channelInfo.snippet.thumbnails.default.url}
              className="object-cover h-13 rounded-full"
            />
          </div>
          <div>
            <h2 className="font-bold text-md">
              {channelInfo.snippet.localized.title}
            </h2>
            <h2 className="text-md text-gray-500">
              {`${formatViews(channelInfo.statistics.subscriberCount)} Subscribers`}
            </h2>
          </div>
        </div>
        <div className="right">
          <button className="text-white bg-red-600 px-1.5 py-1 rounded-sm cursor-pointer active:scale-95 font-medium">
            Subscribe
          </button>
        </div>
      </div>
      <Reactions value={videoId} />
    </div>
  );
};

export default Comment;
