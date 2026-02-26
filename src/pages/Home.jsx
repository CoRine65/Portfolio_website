import { Link } from "react-router-dom";
import { useState } from "react";
import AirportFlipText from "../components/AirportFlipText";

const cards = [
  {
    to: "/projects/sudoku",
    title: "SUDOKU PAGE",
    meta: ["RAILS API + JWT", "HUMAN VS AI", "SYSTEM WRITEUP"],
  },
  {
    to: "/projects/bakery",
    title: "BAKERY PAGE",
    meta: ["FRONT-END UI", "CART FLOW", "RESPONSIVE LAYOUT"],
  },
  {
    to: "/about",
    title: "ABOUT",
    meta: ["STORY", "JOURNEY", "VALUES"],
  },
  {
    to: "/contact",
    title: "CONTACT",
    meta: ["EMAIL", "GITHUB", "LINKEDIN"],
  },
];

function Card({ to, title, meta }) {
  const [active, setActive] = useState(false);

  return (
    <div
      className="card airport"
      onMouseEnter={() => setActive(true)}
      onMouseLeave={() => setActive(false)}
      onFocus={() => setActive(true)}
      onBlur={() => setActive(false)}
    >
      <Link className="cardLink" to={to}>
        <div className="cardTitle">{title}</div>

        <ul className="cardMeta" aria-hidden={!active}>
          {meta.map((m) => (
            <li key={m}>
              <AirportFlipText
                text={m}
                active={active}
                duration={620}
                stagger={16}
                className="airportLine"
              />
            </li>
          ))}
        </ul>
      </Link>
    </div>
  );
}

export default function Home() {
  return (
    <div className="page">
      <h1>Catherine</h1>

      <nav className="home-nav">
        {cards.map((c) => (
          <Card key={c.to} {...c} />
        ))}
      </nav>
    </div>
  );
}