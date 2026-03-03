import { Outlet } from "react-router-dom";
import CanvasBackground from "../components/CanvasBackground";

export default function SiteLayout() {
    return (
       <>
      <CanvasBackground />
      <div className="app-stack">
        <Outlet />
      </div>
    </>
    );
}