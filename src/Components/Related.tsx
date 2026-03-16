import { getSearchData } from "/src/Api/api";
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import { storeVideo } from "/src/redux/Features/videoSlice";

const Related = ({ value }) => {
  const dispatch = useDispatch();
  const [relatedData, setRelatedData] = useState([]);
  function timeAgo(publishedAt) {
    const now = new Date();
    const publishedDate = new Date(publishedAt);
    const diff = now.getTime() - publishedDate.getTime();

    const seconds = Math.floor(diff / 1000);
    const minutes = Math.floor(seconds / 60);
    const hours = Math.floor(minutes / 60);
    const days = Math.floor(hours / 24);
    const months = Math.floor(days / 30);
    const years = Math.floor(days / 365);

    if (years > 0) return years + "y ago";
    if (months > 0) return months + "mo ago";
    if (days > 0) return days + "d ago";
    if (hours > 0) return hours + "h ago";
    if (minutes > 0) return minutes + "m ago";
    return "just now";
  }
  useEffect(() => {
    const getRelatedData = async () => {
      const data = await getSearchData(value);
      setRelatedData(data.slice(1));
      console.log("related data is", data);
    };
    getRelatedData();
  }, [value]);
  return (
    <div className="flex flex-col gap-3.5">
      {relatedData.map((item, idx) => {
        return (
          <Link
            key={idx}
            to={`/video/${item.id.videoId || item.id}`}
            onClick={() => dispatch(storeVideo(item))}
          >
            <div className="flex flex-col space-y-2 w-full sm:w-70 sm:h-70">
              <img
                className="w-full h-40 sm:h-48 md:h-52 lg:h-56 object-cover rounded-md"
                src={item.snippet.thumbnails?.medium?.url}
                alt={item.snippet?.title}
              />
              <h2 className="text-sm sm:text-base font-semibold text-wrap">
                {item.snippet.title}
              </h2>
              <h3 className="text-xs text-gray-500">
                {item.snippet.channelTitle}
              </h3>
              <p className="text-xs text-gray-500">
                {timeAgo(item.snippet?.publishedAt)}
              </p>
            </div>
          </Link>
        );
      })}
    </div>
  );
};

export default Related;
