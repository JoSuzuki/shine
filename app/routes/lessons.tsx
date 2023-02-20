import { Link, Outlet } from "@remix-run/react";
import { Fragment } from "react";
import Logo from "../components/logo/logo";
import styles from "~/styles/routes.lessons.css";

export function links() {
  return [{ rel: "stylesheet", href: styles }];
}

export default function Lessons() {
  return (
    <Fragment>
      <nav className="routes-lessons-navbar">
        <Link to=".." className="routes-lessons-logo-wrapper">
          <Logo className="routes-lessons-logo" />
          <div className="routes-lessons-logo-font">Shine</div>
        </Link>
      </nav>
      <main className="routes-lessons-main">
        <div className="routes-lessons-main-content">
          <Outlet />
        </div>
      </main>
    </Fragment>
  );
}
