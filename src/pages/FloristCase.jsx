import ProjectCaseLayout from "../layout/ProjectCaseLayout";
import placeholder1 from "../assets/placeholder1.jpg";
import placeholder2 from "../assets/placeholder2.jpg";
import github from "../assets/github.svg";
import linkedin from "../assets/linkedin.svg";
import AirportFlipText from "../components/AirportFlipText";

export default function FloristCase() {
  return (
    <ProjectCaseLayout
      header={
        <>
          <h1>Cat's Florals</h1>
          <p>An interactive ordering experience.</p>

          <ul className="meta-list airport">
            <li>
              <strong>Stack:</strong>{" "}
              <AirportFlipText
                text="React + Vite"
                active
                duration={620}
                stagger={16}
              />
            </li>
            <li>
              <strong>Focus:</strong>{" "}
              <AirportFlipText
                text="UI + data"
                active
                duration={620}
                stagger={16}
              />
            </li>
            <li>
              <strong>Status:</strong>{" "}
              <AirportFlipText
                text="In progress"
                active
                duration={620}
                stagger={16}
              />
            </li>
          </ul>
        </>
      }
      actions={
        <>
          <a>
            <img src={github} alt="GitHub" width="24" />
          </a>
          <a>
            <img src={linkedin} alt="Linkedin" width="24" />
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
