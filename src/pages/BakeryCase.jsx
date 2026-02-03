import ProjectCaseLayout from "../layout/ProjectCaseLayout";
import placeholder1 from "../assets/placeholder1.jpg";
import placeholder2 from "../assets/placeholder2.jpg";
import github from "../assets/github.svg";
import linkedin from "../assets/linkedin.svg";

export default function BakeryCase() {
  return (
    <ProjectCaseLayout
      header={
        <>
          <h1>Bakery</h1>
          <p>An interactive ordering experience.</p>

          <ul className="meta-list">
            <li><strong>Stack:</strong> React + Vite </li>
            <li><strong>Focus:</strong> UI + data  </li>
            <li><strong>Status:</strong> In progress </li>
          </ul>
        </>
      }
      actions={
        <>
          <a>
            <img src={github} alt="GitHub" width="24"/>
          </a>
          <a>
            <img src={linkedin} alt="Linkedin" width="24"/>  
          </a>
        </>
      }
      media={
        <div className="mediaGrid">
          <div className="mediaBox">
            <img src={placeholder1} alt="computer"></img>
          </div>
          <div className="mediaBox">
            <img src={placeholder2} alt="computer"></img>
          </div>
        </div>
      }
    >

      <section>
        <h2>Overview</h2>
        <p>Placeholder copy...</p>
      </section>

       <section>
        <h2>What I built</h2>
        <ul>
          <li>Placeholder bullet</li>
          <li>Placeholder bullet</li>
        </ul>
      </section>

    </ProjectCaseLayout>
  );
}
