import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { getSearchData } from "/src/API/api";
import { Link, useSearchParams } from "react-router-dom";
import { storeVideo } from "/src/redux/Features/videoSlice";

const Search = () => {
  const [searchData, setSearchdata] = useState([]);
  const [params] = useSearchParams();
  const query = params.get("q");
  const dispatch = useDispatch();
  useEffect(() => {
    if (!query) return;
    const getData = async () => {
      const data = await getSearchData(query);
      setSearchdata(data);
      console.log("data is", data);
    };
    getData();
  }, [query]);
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
  return (
    <div className="flex flex-wrap gap-3 justify-center items-center">
      {searchData.map((item, idx) => {
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
                  {formatViews(item.statistics?.viewCount)} views •{" "}
                  {timeAgo(item.snippet?.publishedAt)}
                </p>
              </div>
            </Link>
        );
      })}
    </div>
  );
};

export default Search;
