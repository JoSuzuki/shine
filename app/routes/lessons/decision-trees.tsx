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
