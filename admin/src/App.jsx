import Home from "./pages/home/Home";
import User from "./pages/user/User";
import LoginPage from "./pages/login/LoginPage";
import CreateCategory from "./pages/createCategory/CreateCategory";
import EditCategory from "./pages/editCategory/EditCategory";
import CreatePost from "./pages/createPost/CreatePost";
import EditPost from "./pages/editPosts/EditPosts";
import AllCategory from "./pages/allCategory/AllCategory";
import AllPost from "./pages/allPosts/AllPost";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { useAdminAuth } from "./context/AdminAuthContext";

export const API_URL = import.meta.env.VITE_SERVER_URL;

function App() {
  const { adminUser } = useAdminAuth();
  return (
    <div>
      <BrowserRouter>
        <Routes>
          <Route
            path="/login"
            element={!adminUser ? <LoginPage /> : <Navigate to="/dashboard" />}
          />
          <Route path="/" element={!adminUser ? <LoginPage /> : <Home />} />

          <Route path="/users" element={<User />} />

          <Route
            path="/createCategory"
            element={!adminUser ? <LoginPage /> : <CreateCategory />}
          />
          <Route
            path="/editCategory/:categoryId"
            element={!adminUser ? <LoginPage /> : <EditCategory />}
          />
          <Route
            path="/createPost"
            element={!adminUser ? <LoginPage /> : <CreatePost />}
          />
          <Route
            path="/editPost/:postId"
            element={!adminUser ? <LoginPage /> : <EditPost />}
          />
          <Route path="/allCategory" element={<AllCategory />} />
          <Route path="/allPost" element={<AllPost />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
