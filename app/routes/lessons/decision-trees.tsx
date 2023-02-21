import type { ActionArgs } from "@remix-run/node";
import { Fragment } from "react";
import ExerciseDecisionTree01, {
  links as exerciseDecisionTreeLinks01,
  action as exerciseDecisionTreeAction01,
  EXERCISE_NAME as EXERCISE_NAME_01,
} from "../../components/exercise-decision-tree/exercise-decision-tree-01";
import ExerciseDecisionTree02, {
  links as exerciseDecisionTreeLinks02,
  action as exerciseDecisionTreeAction02,
  EXERCISE_NAME as EXERCISE_NAME_02,
} from "../../components/exercise-decision-tree/exercise-decision-tree-02";
import ExplanationExerciseDecisionTree01, {
  links as explanationDecisionTreeLinks01,
} from "../../components/exercise-decision-tree/explanation-exercise-decision-tree-01";
import ExplanationExerciseDecisionTree02, {
  links as explanationDecisionTreeLinks02,
} from "../../components/exercise-decision-tree/explanation-exercise-decision-tree-02";
import ExplainableCard, {
  links as explainableCardLinks,
} from "../../components/explainable-card/explainable-card";
import Spacer, { links as spacerLinks } from "../../components/spacer/spacer";

export function links() {
  return [
    ...spacerLinks(),
    ...explainableCardLinks(),
    ...exerciseDecisionTreeLinks01(),
    ...explanationDecisionTreeLinks01(),
    ...exerciseDecisionTreeLinks02(),
    ...explanationDecisionTreeLinks02(),
  ];
}

export default function DecisionTrees() {
  return (
    <Fragment>
      <h1>Decision trees</h1>
      <Spacer size="md" />
      Cool features to notice in this example:
      <ul>
        <li>
          The card maintains the size of the larger content (front or back).
        </li>
        <li>
          When a screen reader reads the card, it only reads the content that is
          being displayed. (Depending on the implementation it'd read the back
          when only the front should be visible or would read the front when
          only the back is visible)
        </li>
        <li>
          When showing the explanation of a card the focus is moved to the top
          of the card, allowing screen readers to follow the "natural flow",
          instead of having to come back to the previous content
        </li>
        <li>You can select the alternatives (which face) via keyboard</li>
        <li>
          Screen readers display labels for the faces relative to the decision
          tree necessary to get to the face
        </li>
        <li>Drag and drop is still implemented for the marker</li>
        <li>
          When clicking the check option it has a aria-live region which allows
          a user with a screen reader to know what was the response of that
          button press
        </li>
        <li>
          Usage of role="radio-group" allows assistive tecnology to know that
          the radio on the page belongs to a specific group (if not specified,
          it usually considers all radios to be in one big group)
        </li>
      </ul>
      Known missing features:
      <ul>
        <li>
          Selecting the correct option doesn't disable the radio (you can change
          the answer after selecting correct)
        </li>
        <li>There is no database, so no persistency</li>
        <li>Doesn't show in the svg the selected path</li>
        <li>No solution animations</li>
        <li>There could be a better description of the svg as an alt text</li>
      </ul>
      <Spacer size="md" />
      <ExplainableCard
        front={<ExerciseDecisionTree01 />}
        back={<ExplanationExerciseDecisionTree01 />}
      />
      <Spacer size="lg" />
      <ExplainableCard
        front={<ExerciseDecisionTree02 />}
        back={<ExplanationExerciseDecisionTree02 />}
      />
    </Fragment>
  );
}

export async function action({ request }: ActionArgs) {
  const form = await request.formData();

  const { _action, ...formData } = Object.fromEntries(form);

  if (_action === EXERCISE_NAME_01) {
    return exerciseDecisionTreeAction01({ formData } as any);
  }

  if (_action === EXERCISE_NAME_02) {
    return exerciseDecisionTreeAction02({ formData } as any);
  }
}
