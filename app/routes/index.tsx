import { Link } from "@remix-run/react";
import Logo from "../components/logo/logo";
import styles from "~/styles/routes.index.css";

export function links() {
  return [{ rel: "stylesheet", href: styles }];
}

export default function Index() {
  return (
    <main>
      <div className="routes-index-logo-wrapper">
        <Logo className="routes-index-logo" />
        <h1 className="routes-index-logo-font">Shine</h1>
      </div>
      <div className="routes-index-lessons-wrapper">
        <h2>Lessons</h2>
        <ol>
          <li>
            <Link to="lessons/decision-trees">Decision trees</Link>
          </li>
          <li>
            <Link to="lessons/creating-decision-trees">
              Creating decision trees
            </Link>
          </li>
        </ol>
      </div>
    </main>
  );
}
