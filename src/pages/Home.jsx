import { Link } from "react-router-dom";



export default function Home() {
  return (
    <div className="page">
      <h1>Catherine</h1>
      <nav className="home-nav">
        <div className = "airport card">
          <Link to="/projects/sudoku">Sudoku Page</Link>
        </div>
        <div className = "airport card">
          <Link to="/projects/bakery">Bakery Page</Link>
        </div>
        <div className = "airport card">
          <Link to="/about">About</Link>
        </div>
        <div className = "airport card">
          <Link to="/contact">Contact</Link>
        </div>
      </nav>
    </div>
  );
}
