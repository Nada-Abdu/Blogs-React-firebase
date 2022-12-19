import React, { useState } from "react";
import { useParams } from "react-router-dom";

const UpdatePost = () => {
  const { id } = useParams();

  const [title, setTitle] = useState("");
  const [postText, setPostText] = useState("");

  return (
    <div className="createPostPage">

      <div className="cpContainer">
        <h1>Update Post</h1>
        <div className="inputGp">
          <label>Title:</label>
          <input
            onChange={(event) => {
              setTitle(event.target.value);
            }}
          />
        </div>
        <div className="inputGp">
          <label>Post:</label>
          <textarea
            onChange={(event) => {
              setPostText(event.target.value);
            }}
          ></textarea>
        </div>
        <button>Update Post</button>
      </div>
    </div>
  );
};

export default UpdatePost;
