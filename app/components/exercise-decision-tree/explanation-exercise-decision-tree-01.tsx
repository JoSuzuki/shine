import { Fragment } from "react";
import Spacer, { links as spacerLinks } from "../spacer/spacer";

export function links() {
  return [...spacerLinks()];
}

export default function ExplanationExerciseDecisionTree01() {
  return (
    <Fragment>
      <h2>Explanation</h2>
      <Spacer size="md" />
      <div>
        In this case, the computer would conclude the face is the second face
        from the left: beard false, purple hair true.
      </div>
    </Fragment>
  );
}
