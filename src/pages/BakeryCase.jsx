import { Link } from "react-router-dom";

export default function BakeryCase() {
  return (
    <div>
      <h1>Bakery</h1>
      <nav style={{ display: "flex", gap: "12px" }}>
        <Link to="/">Home</Link>
      </nav>
    </div>
  );
}
