import { Link } from "react-router-dom";
const cardStyle = {
  width: "200px",
  height: "120px",
  border: "1px dashed gray",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
};


export default function Home() {
  return (
    <div>
      <h1>Catherine</h1>
      <nav style={{ display: "flex", gap: "12px" }}>

        
        <div style={cardStyle}><Link to="/projects/sudoku">Sudoku Page</Link></div>
        <div style={cardStyle}><Link to="/projects/bakery">Bakery Page</Link></div>
        <div style={cardStyle}><Link to="/about">About</Link></div>
        <div style={cardStyle}><Link to="/contact">Contact</Link></div>
        
        
        
        
      </nav>

    </div>
  );
}
