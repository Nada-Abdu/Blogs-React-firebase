import { async } from "@firebase/util";
import React, { useState, useEffect } from "react";
import { addDoc, collection } from "firebase/firestore";
import { DB, auth } from "../firebase-config";
import { useNavigate } from "react-router-dom";

const CreatePost = ({ isAuth }) => {
  const [title, setTitle] = useState("");
  const [postText, setPostText] = useState("");
  const navigate = useNavigate();

  // to redirect t another page
  const postCollectionRef = collection(DB, "posts");

  // async is required for firebase functions
  const createPost = async () => {
    // take two parameters >> 1- which collection talking about , 2- data wanna to add
    // title (filed): titel (stsate) >> can wite as title just
    // auth : google publish all user info, so we can use user info from google to store in firebase
    await addDoc(postCollectionRef, {
      title,
      postText,
      auther: { name: auth.currentUser.displayName, id: auth.currentUser.uid },
    });
    navigate("/");
  };

  // to protect the route , only access by authenticate user
  useEffect(() => {
    if (!isAuth) {
      navigate("/login");
    }
  }, []);

  return (
    <div className="createPostPage">
      <div className="cpContainer">
        <h1>Create A Post</h1>
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
        <button onClick={createPost}>Submit Post</button>
      </div>
    </div>
  );
};

export default CreatePost;
