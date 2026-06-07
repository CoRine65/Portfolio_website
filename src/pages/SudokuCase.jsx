import ProjectCaseLayout from "../layout/ProjectCaseLayout";
import ImageCarousel from "../components/ImageCarousel";

import sgameStart from "../assets/showcase/s-gamestart.png";
import sgamePlay from "../assets/showcase/s-gameplay.png";
import splayerWon from "../assets/showcase/s-playerwon.png";

import github from "../assets/github.svg";
import linkedin from "../assets/linkedin.svg";
import AirportFlipText from "../components/AirportFlipText";

export default function SudokuCase() {
  return (
    <ProjectCaseLayout
      header={
        <>
          <h1>Sudoku: Human vs Computer</h1>
          <p>
            A competitive Sudoku game where players race against the computer
            across multiple difficulty levels.
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
                text="Game Logic + UI"
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
                { src: sgameStart, alt: "Sudoku game start screen" },
                { src: sgamePlay, alt: "Sudoku game play" },
                { src: splayerWon, alt: "Sudoku player won" },
              ]}
            />
          </div>
        </div>
      }
    >
      <section>
        <h2>Overview</h2>
        <p>
          Sudoku: Human vs Computer is a browser-based Sudoku game that allows
          players to compete against an AI opponent while solving the same
          puzzle. The project focuses on combining game logic, state management,
          and user interface design into an interactive experience that feels
          both familiar and competitive.
        </p>
        <p>
          Players can choose from multiple difficulty levels, track progress in
          real time, and race to complete the puzzle before the computer. The
          application was built to strengthen React fundamentals while managing
          complex game state and user interactions.
        </p>
      </section>

      <section>
        <h2>What I built</h2>
        <ul>
          <li>
            Interactive Sudoku board with player input, validation, and puzzle
            progression.
          </li>

          <li>
            Human vs computer gameplay where both sides solve the same puzzle
            simultaneously.
          </li>

          <li>
            Multiple difficulty levels that generate different puzzle
            experiences.
          </li>

          <li>
            Game state management using React components, props, and hooks.
          </li>

          <li>
            Win detection, game flow controls, and status messaging for
            completed puzzles.
          </li>

          <li>
            Responsive interface designed to keep gameplay clear and accessible
            across screen sizes.
          </li>
        </ul>
      </section>
    </ProjectCaseLayout>
  );
}
