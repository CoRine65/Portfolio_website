import { Link } from "react-router-dom";

export default function About() {
  return (
    <main className="about">

      <header className="about_header">
        <h1> About Me </h1>
      </header>

      <section className="about_body">
        <p>
          Hello, my name is Catherine Navarro. I am a a software developer focused on 
          building thoughtful, well-structured applications. I’m currently working primarily 
          on the web with React and Rails, while steadily strengthening my foundation in computer 
          science and system-level thinking. I care about clarity, clean architecture, and creating 
          work that feels intentional.
        </p>
      </section>








      <nav className="about_nav">
        <Link to="/">Home</Link>
        <Link to="/Contact">    Contact</Link>
      </nav>


    </main>







    
  );
}
