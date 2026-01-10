import { Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import SudokuCase from "./pages/SudokuCase";
import BakeryCase from "./pages/BakeryCase";
import About from "./pages/About";
import Contact from "./pages/Contact";


import './App.css'
import SiteLayout from "./layout/SiteLayout";

function App() {


  return (
    
    <Routes>
      <Route element={<SiteLayout />}>
        <Route path="/" element={<Home />} />
        <Route path="/projects/sudoku" element={<SudokuCase />} />
        <Route path="/projects/bakery" element={<BakeryCase />} />
        <Route path="/about" element={<About />} />
        <Route path="/contact" element={<Contact />} />
      </Route>
    </Routes>
  );
}

export default App
