import { Outlet } from "react-router-dom";

export default function SiteLayout() {
    return (
        <div className="site-bg">
            Site layout is active! 
            <div className="site-frame">
                <Outlet />
            </div>
        </div>
    );
}