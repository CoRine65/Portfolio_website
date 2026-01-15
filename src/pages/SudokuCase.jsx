import ProjectCaseLayout from "../layout/ProjectCaseLayout";

export default function SudokuCase() {
  return (
    <ProjectCaseLayout
      header={
        <>
          <h1>Sudoku: Human vs Computer</h1>
          <p>A playable Sudoku experience with difficulty modes 
            and clean UX.
          </p>

          <ul>
            <li><strong>Stack:</strong> React + Vite </li>
            <li><strong>Focus:</strong> UI + logic + polish </li>
            <li><strong>Status:</strong> In progress </li>
          </ul>
        </>
      }
      actions={
        <>
          <a>
            github
          </a>
          <a>
            live 
          </a>
        </>
      }
      media={
        <>
          <div className="mediaBox">[ image placeholder ]</div>
          <div className="mediaBox">[ gif placeholder ]</div>
        </>
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
