import { BrowserRouter, Routes, Route, Link } from "react-router";
import {Home} from './pages/Home';
import { Characters } from "./pages/Characters";
import { AboutComic } from "./pages/AboutComic";

function App() {
  return (
    <BrowserRouter>
    <nav>
      <Link to="/">Home</Link>
      <Link to="/characters">Characters</Link>
      <Link to="/about-comic">About Comic</Link>
    </nav>

    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/characters" element={<Characters />} />
      <Route path="/about-comic" element={<AboutComic />} />
    </Routes>

    </BrowserRouter>
  )
};

export default App;
