import { Link } from "react-router-dom";

export default function Home() {
  return (
    <div>
      <h1>Home</h1>
      <nav style={{ display: "flex", gap: "12px" }}>
        <Link to="/projects/sudoku">Sudoku Page</Link>
        <Link to="/projects/bakery">Bakery Page</Link>
        <Link to="/about">About</Link>
        <Link to="/contact">Contact</Link>
      </nav>

    </div>
  );
}
