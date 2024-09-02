import SinglePost from "./pages/singlePost/SinglePost";
import HowToStyle from "./pages/howToStyle/HowToStyle";
import "./App.module.css";
import Home from "./pages/home/Home";
import Contact from "./pages/contact/Contact";
import Register from "./pages/register/Register";
import Login from "./pages/login/Login";
import CategoryContent from "./pages/Category/CategoryContent.jsx";
import UseLo from "./pages/UseLo.jsx";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { useAuth } from "./context/AuthContext";

// This is how to use env variables in vite
export const URL = import.meta.env.VITE_SERVER_URL;

function App() {
  const { user } = useAuth();
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/category/:category" element={<CategoryContent />} />
          <Route path="/singlePost/:postId" element={<SinglePost />} />
          <Route path="/HowToStyle/:postId" element={<HowToStyle />} />
          <Route path="/contact" element={<Contact />} />
          <Route
            path="/register"
            element={!user ? <Register /> : <Navigate to="/" />}
          />
          {/* <Route path="/useLo" element={<UseLo />} /> */}
          <Route
            path="/login"
            element={!user ? <Login /> : <Navigate to="/" />}
          />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
