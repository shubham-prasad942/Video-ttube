import { useEffect, useState } from "react";
import { getCommentData } from "/src/API/api";
import { images } from "/src/assets/images";

const Reactions = ({ value }) => {
  const [comments, setComments] = useState([]);
  useEffect(() => {
    if (!value) return;
    const fetchCommentData = async () => {
      const data = await getCommentData(value);
      setComments(data);
    };
    fetchCommentData();
  }, [value]);
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
  return (
    <div className="space-y-5 py-2">
      <p className="font-bold text-gray-600 py-0.5">20 Comments</p>
      {comments.map((item, index) => {
        const comment = item.snippet.topLevelComment.snippet;

        return (
          <div key={index}>
            <div className="flex gap-3 items-start" key={index}>
              {/* Avatar */}
              <div className="h-11 w-11 rounded-full overflow-hidden shrink-0">
                <img
                  className="h-full w-full object-cover"
                  src={comment.authorProfileImageUrl}
                  alt=""
                />
              </div>

              {/* Content */}
              <div className="flex flex-col gap-1">
                {/* Author + Time */}
                <div className="flex items-center gap-2 text-sm">
                  <p className="font-medium text-gray-900">
                    {comment.authorDisplayName}
                  </p>
                  <span className="text-xs text-gray-500">
                    {timeAgo(comment.updatedAt)}
                  </span>
                </div>

                {/* Comment Text */}
                <p className="text-sm text-gray-800 leading-relaxed max-w-[640px]">
                  {comment.textOriginal}
                </p>

                {/* Actions */}
                <div className="flex items-center gap-5 mt-1 text-sm text-gray-600">
                  <div className="flex items-center gap-1 cursor-pointer">
                    <img className="h-4" src={images.like} alt="" />
                    <span>{comment.likeCount}</span>
                  </div>

                  <div className="flex items-center gap-1 cursor-pointer">
                    <img className="h-4" src={images.dislike} alt="" />
                  </div>
                </div>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default Reactions;
