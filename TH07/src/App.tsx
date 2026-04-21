import { BrowserRouter, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import Home from "./pages/Home";
import About from "./pages/About";
<Route path="/about" element={<About />} />
import PostDetail from "./pages/PostDetail";
import AdminPosts from "./pages/AdminPosts";
import AdminTags from "./pages/AdminTags";
import "./styles/global.css";
function App() {
  return (
    <BrowserRouter>
      <Navbar />

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/post/:slug" element={<PostDetail />} />
        <Route path="/admin/posts" element={<AdminPosts />} />
        <Route path="/admin/tags" element={<AdminTags />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;