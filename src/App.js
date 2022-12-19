import "./App.css";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Link,
  BrowserRouter,
} from "react-router-dom";
import Home from "./pages/Home";
import Login from "./pages/Login";
import CreatePost from "./pages/CreatePost";
import { useState } from "react";
import { signOut } from "firebase/auth";
import { auth } from "./firebase-config";
import UpdatePost from "./pages/UpdatePost";
// import {} from "react-router-dom";

function App() {
  const [isAuth, setIsAuth] = useState(localStorage.getItem("isAuth"));

  const signUserOut = () => {
    signOut(auth).then(() => {
      localStorage.clear();
      setIsAuth(false);
      window.location.pathname = "/login";
      // can't use navigate out router component <Router></Router> , Error: useNavigate() may be used only in the context of a <Router>
      // navigate("/login");
    });
  };

  return (
    <Router>
      <nav>
        <Link to="/">Home</Link>

        {!isAuth ? (
          <Link to="/login">Login</Link>
        ) : (
          // react fragments : to warp many child . use instead div because it is more efficient
          <>
            <Link to="/createpost">Create Post</Link>
            <button onClick={signUserOut}>Log Out</button>
          </>
        )}
      </nav>

      <Routes>
        <Route path="/" element={<Home isAuth={isAuth} />} />
        <Route path="/login" element={<Login setIsAuth={setIsAuth} />} />
        <Route path="/createpost" element={<CreatePost isAuth={isAuth} />} />
        <Route path="/updatepost/:id" element={<UpdatePost />} />
      </Routes>
    </Router>
  );
}

export default App;
