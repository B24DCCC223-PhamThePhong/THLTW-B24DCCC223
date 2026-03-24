import { BrowserRouter, Routes, Route, Link } from "react-router-dom";
import BooksPage from "./pages/BooksPage";
import DecisionsPage from "./pages/DecisionsPage";
import DiplomasPage from "./pages/DiplomasPage";
import SearchPage from "./pages/SearchPage";
import "./App.css";

export default function App() {
  return (
    <BrowserRouter>
      <div className="container">
        <nav className="navbar">
          <Link to="/books">Sổ</Link>
          <Link to="/decisions">Quyết định</Link>
          <Link to="/diplomas">Văn bằng</Link>
          <Link to="/search">Tra cứu</Link>
        </nav>

        <div className="content">
          <Routes>
            <Route path="/books" element={<BooksPage />} />
            <Route path="/decisions" element={<DecisionsPage />} />
            <Route path="/diplomas" element={<DiplomasPage />} />
            <Route path="/search" element={<SearchPage />} />
          </Routes>
        </div>
      </div>
    </BrowserRouter>
  );
}
