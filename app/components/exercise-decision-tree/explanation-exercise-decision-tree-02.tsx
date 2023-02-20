import { Fragment } from "react";
import Spacer, { links as spacerLinks } from "../spacer/spacer";

export function links() {
  return [...spacerLinks()];
}

export default function ExplanationExerciseDecisionTree02() {
  return (
    <Fragment>
      <h2>Explanation</h2>
      <Spacer size="md" />
      <div>
        In this case, the computer would conclude the face is the second to last
        face: beard false, purple hair false, smiling true, blue hair false,
        long hair false, black hair false
      </div>
    </Fragment>
  );
}
