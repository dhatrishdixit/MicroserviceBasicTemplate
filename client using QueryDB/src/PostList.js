import React, { useState, useEffect } from "react";
import axios from "axios";
import CommentCreate from "./CommentCreate";
import CommentList from "./CommentList";

const PostList = ({refresh}) => {
  const [posts, setPosts] = useState({});

  // {postId:{title,comments:[]}}
  const fetchPosts = async () => {
      try {
          const res = await axios.get("http://posts.com/posts");

          setPosts(res.data);
      } catch (error) {
          console.log(error)
      }
  };

  useEffect(() => {
    fetchPosts();
  }, [refresh]);

  const renderedPosts = Object.values(posts).map((post) => {
    console.log(post)
    return (
      <div
        className="card"
        style={{ width: "30%", marginBottom: "20px" }}
        key={Math.random()}
      >
        <div className="card-body">
          <h3>{post.title}</h3>
          <CommentList comments={post.comments} />
          <CommentCreate postId={post.postId} />
        </div>
      </div>
    );
  });

  return (
    <div className="d-flex flex-row flex-wrap justify-content-between">
      {renderedPosts}
    </div>
  );
};

export default PostList;
