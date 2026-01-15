import { Link } from "react-router-dom";

export default function ProjectCaseLayout({
    backTo = "/",
    backLabel = "< Home",
    header,
    actions,
    media,
    children,
}) {
    return (

        /* navigation */
        <div className="case">
            <div className="case_back">
                <Link to={backTo} className="case_backLink">
                    {backLabel}
                </Link>
            </div>
    
            <header className="case_header">
                {header}
                <div className="case_actions">{actions}</div>
            </header>

            <section className="case_media">{media}</section>

            <main className="case_body">{children}</main>
        </div>
    );
}