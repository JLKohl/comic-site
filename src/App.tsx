import { BrowserRouter, Routes, Route, NavLink } from "react-router";
import {Home} from './pages/Home';
import { Characters } from "./pages/Characters";
import { AboutComic } from "./pages/AboutComic";
import { CharacterDetails } from "./pages/CharacterDetails";

function App() {
  return (
    <BrowserRouter>
    <nav>
      <NavLink to="/">Home</NavLink>
      <NavLink to="/characters">Characters</NavLink>
      <NavLink to="/about-comic">About Comic</NavLink>
    </nav>

    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/characters" element={<Characters />} />
      <Route path="/characters/:id" element={<CharacterDetails />} />
      <Route path="/about-comic" element={<AboutComic />} />
    </Routes>

    </BrowserRouter>
  )
};

export default App;
