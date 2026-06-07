import ProjectCaseLayout from "../layout/ProjectCaseLayout";
import ImageCarousel from "../components/ImageCarousel";

import cfshowCase from "../assets/showcase/cf-showcase.png";
import cfContact from "../assets/showcase/cf-contact.png";
import cfthankYou from "../assets/showcase/cf-thankyou.png";

import github from "../assets/github.svg";
import linkedin from "../assets/linkedin.svg";
import AirportFlipText from "../components/AirportFlipText";

export default function FloristCase() {
  return (
    <ProjectCaseLayout
      header={
        <>
          <h1>Cat's Florals</h1>
          <p>
            A florist portfolio and ordering experience focused on custom
            arrangements and elegant user interactions.
          </p>

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
                text="UI + UX"
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
        <div className="singleMedia">
          <div className="mediaBox">
            <ImageCarousel
              images={[
                { src: cfshowCase, alt: "Florist showcase page" },
                { src: cfContact, alt: "Florist contact page" },
                { src: cfthankYou, alt: "Florist thank you card" },
              ]}
            />
          </div>
        </div>
      }
    >
      <section>
        <h2>Overview</h2>
        <p>
          Cat's Florals is a fictional florist website designed to showcase
          customizable floral arrangements through a clean, editorial-inspired
          interface. The project focuses on creating a polished browsing
          experience while guiding visitors from discovery to inquiry through a
          dedicated contact workflow.
        </p>

        <p>
          The site features animated floral elements, arrangement galleries,
          responsive layouts, and a custom contact form with a confirmation
          modal, creating an experience that feels both elegant and
          approachable.
        </p>
      </section>

      <section>
        <h2>What I built</h2>
        <ul>
          <li>
            Multi-page React application using React Router for navigation
            between Home, Showcase, and Contact pages.
          </li>
          <li>
            Interactive contact form with preferred contact methods, scheduling
            options, and a custom thank-you confirmation modal.
          </li>

          <li>
            Custom CSS animations including floating florals, and background
            transitions.
          </li>

          <li>
            Mobile-friendly layouts designed without external UI frameworks to
            strengthen CSS and layout fundamentals.
          </li>
        </ul>
      </section>
    </ProjectCaseLayout>
  );
}
