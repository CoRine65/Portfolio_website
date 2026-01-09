import { Link } from "react-router-dom";

export default function Contact() {
  return (
    <div>
      <h1>Contact</h1>

      <nav style={{ display: "flex", gap: "12px" }}>
        <Link to="/">Home</Link>
      </nav>
    </div>
  );
}
