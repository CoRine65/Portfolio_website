import { Link } from "react-router-dom";
import github from "../assets/github.svg";
import linkedin from "../assets/linkedin.svg"

export default function Contact() {
  return (
    <div className="page">
      <h1>Contact</h1>

      <p>
        Email:{" "}
        <a href="mailto:coderine65@gmail.com">
          coderine65@gmail.com
        </a>
      </p>

      <div className="contact-icons"> 
      <a href="https://github.com/CoRine65"
        target="_blank"
        rel="noreferrer">
        <img src={github} alt="GitHub" width="24"/>
      </a>

      <a href="https://www.linkedin.com"
        target="_blank"
        rel="noreferrer">
        <img src={linkedin} alt="Linkedin" width="24"/>
      </a>
      </div>
      <nav className="simple-nav">
        <Link to="/">Home</Link>
      </nav>
    </div>
  );
}
