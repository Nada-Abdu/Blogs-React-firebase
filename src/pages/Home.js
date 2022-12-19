import React, { useEffect, useState } from "react";
import { collection, deleteDoc, doc, getDocs } from "firebase/firestore";
import { auth, DB } from "../firebase-config";
import { async } from "@firebase/util";
import { useNavigate } from "react-router-dom";

const Home = ({ isAuth }) => {
  const [postLists, setPostList] = useState([]);
  const postCollectionRef = collection(DB, "posts");
  const navigate = useNavigate();

  // call firebase to retrieve data
  useEffect(() => {
    const getPosts = async () => {
      const data = await getDocs(postCollectionRef);
      // add id to an array
      setPostList(data.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
    };
    getPosts();
  });

  const deletePost = async (id) => {
    // doc : taks 3 args . 1- DB 2- collection nama 3- document id
    const postDoc = doc(DB, "posts", id);
    await deleteDoc(postDoc);
  };

  return (
    <div className="homePage">
      {postLists.map((post) => {
        return (
          <div className="post">
            <div className="postHeader">
              <div className="title">
                <h1>{post.title}</h1>
              </div>
              <div className="deletePost">
                {/* show btn just for authorized  user */}
                {isAuth && post.auther.id === auth.currentUser.uid && (
                  <>
                    <button onClick={() => deletePost(post.id)}>
                      &#128465;
                    </button>
                    <button
                      onClick={() => {
                        navigate("/updatepost/:id=" + post.id);
                      }}
                    >
                      &#9998;
                    </button>
                  </>
                )}
              </div>
            </div>
            <div className="postTextContainer">{post.postText}</div>
            <h3>@{post.auther.name}</h3>
          </div>
        );
      })}
    </div>
  );
};

export default Home;
