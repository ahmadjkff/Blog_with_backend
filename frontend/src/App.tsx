import { BrowserRouter, Routes, Route } from "react-router-dom";
import BlogList from "./pages/BlogList";
import Header from "./components/Header";
import Login from "./pages/Login";
import { UserProvider } from "./context/userContext";
import Profile from "./pages/Profile";
import AddBlog from "./pages/AddBlog";

function App() {
  return (
    <UserProvider>
      <BrowserRouter>
        <Header />
        <Routes>
          <Route path="/" element={<BlogList />} />
          <Route path="/login" element={<Login />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/add-blog" element={<AddBlog />} />
        </Routes>
      </BrowserRouter>
    </UserProvider>
  );
}

export default App;
