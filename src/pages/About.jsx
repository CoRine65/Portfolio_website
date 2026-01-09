import { Link } from "react-router-dom";

export default function About() {
  return (
    <div>
      <h1>About</h1>

      <nav style={{ display: "flex", gap: "12px" }}>
        <Link to="/">Home</Link>
      </nav>

    </div>
  );
}
