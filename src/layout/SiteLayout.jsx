import { Outlet } from "react-router-dom";

export default function SiteLayout() {
    return (
        <div className="site-bg">
            <div className="site-frame">
                <Outlet />
            </div>
        </div>
    );
}