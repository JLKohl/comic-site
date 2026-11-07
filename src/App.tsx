import { BrowserRouter, Routes, Route, Link } from "react-router";

function Home(){
  return <h1>Home Page</h1>
}

function Characters(){
  return <h1>Characters</h1>
}

function AboutComic(){
  return <h1> About Comic </h1>
}

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
