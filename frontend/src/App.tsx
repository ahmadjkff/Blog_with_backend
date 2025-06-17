import { BrowserRouter, Routes, Route } from "react-router-dom";
import BlogList from "./pages/BlogList";
import Header from "./components/Header";
import Login from "./pages/Login";
import { UserProvider } from "./context/userContext";
import Profile from "./pages/profile";

function App() {
  return (
    <UserProvider>
      <BrowserRouter>
        <Header />
        <Routes>
          <Route path="/" element={<BlogList />} />
          <Route path="/login" element={<Login />} />
          <Route path="/profile" element={<Profile />} />
        </Routes>
      </BrowserRouter>
    </UserProvider>
  );
}

export default App;
