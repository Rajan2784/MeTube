import React, { useEffect, useState } from "react";
import InfiniteScroll from "react-infinite-scroll-component";
import Loader from "./Loaders/Loader";
import { ApiBaseUrl } from "../utils/api";
import axios from "axios";
import CommentCard from "./CommentCard";
import CommentInput from "./CommentInput";

const Comments = ({ videoId }) => {
  const [loading, setLoading] = useState(false);
  const [page, setPage] = useState(1);
  const limit = 5;
  const [comments, setComments] = useState([]);
  const [commentData, setCommentData] = useState();

  const getComments = async () => {
    const response = await axios.get(
      `${ApiBaseUrl}/comments/${videoId}?page=${page}&limit=${limit}`,
      {
        withCredentials: true,
      }
    );
    setComments(response.data.data.docs);
    setCommentData(response.data.data);
    setPage((prev) => response.data.data.nextPage || prev + 1);
    setLoading(false);
    console.log(response.data.data);
  };

  const getNextComments = () => console.log("Next Function is called");

  useEffect(() => {
    getComments();
  }, [videoId]);

  const hanleNewComment = async (newContent) => {
    try {
      const response = await axios.post(
        `${ApiBaseUrl}/comments/${videoId}`,
        { content: newContent },
        {
          withCredentials: true,
        }
      );
      console.log(response.data);
      setComments([response.data.data, ...comments]);
    } catch (error) {}
  };

  return (
    <>
      {loading ? (
        ""
      ) : (
        <div>
          <div>
            <CommentInput onComment={hanleNewComment} />
          </div>
          <h1 className="mt-5">Comments:</h1>
          <div className="mb-10">
            <InfiniteScroll
              className="w-full"
              dataLength={comments.length}
              next={getNextComments}
              hasMore={commentData?.hasNextPage}
              loader={<Loader />}
            >
              {comments.map((coment) => (
                <CommentCard
                  key={coment._id}
                  comment={coment}
                  setComments={setComments}
                />
              ))}
            </InfiniteScroll>
            {comments.length === 0 ? (
              <h1>No Comments found on this video</h1>
            ) : comments.length >= commentData?.totalDocs ? (
              <div className="flex flex-col justify-center items-center">
                <img src="/check.png" width={32} height={32} alt="check" />
                <p className="text-lg font-bold font-mono">Got all Comments</p>
              </div>
            ) : (
              ""
            )}
          </div>
        </div>
      )}
    </>
  );
};

export default Comments;
