import { BrowserRouter, Routes, Route } from "react-router-dom";
import BlogList from "./pages/BlogList";
import Header from "./components/Header";
import Login from "./pages/Login";
import { UserProvider } from "./context/userContext";
import Profile from "./pages/Profile";
import AddBlog from "./pages/AddBlog";
import { BlogProvider } from "./context/BlogContext";
import ProtectedRoute from "./components/ProtectedRoute";
import MyBlogs from "./pages/MyBlogs";
import BlogDetails from "./pages/BlogDetails";
import EditBlog from "./pages/EditBlog";
import { CommentProvider } from "./context/CommentContext";

function App() {
  return (
    <UserProvider>
      <BlogProvider>
        <CommentProvider>
          <BrowserRouter>
            <Header />
            <Routes>
              <Route path="/" element={<BlogList />} />
              <Route path="/login" element={<Login />} />
              <Route path="/profile" element={<Profile />} />
              <Route path="/my-blogs" element={<MyBlogs />} />
              <Route path="/blog/:id" element={<BlogDetails />} />
              <Route path="/edit/:id" element={<EditBlog />} />
              <Route element={<ProtectedRoute />}>
                <Route path="/add-blog" element={<AddBlog />} />
              </Route>
            </Routes>
          </BrowserRouter>
        </CommentProvider>
      </BlogProvider>
    </UserProvider>
  );
}

export default App;
