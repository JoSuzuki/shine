import { Fragment } from "react";
import ExerciseDecisionTree, {
  links as exerciseDecisionTreeLinks,
} from "../../components/exercise-decision-tree/exercise-decision-tree";
import ExplainableCard, {
  links as explainableCardLinks,
} from "../../components/explainable-card/explainable-card";
import Spacer, { links as spacerLinks } from "../../components/spacer/spacer";

export function links() {
  return [
    ...spacerLinks(),
    ...explainableCardLinks(),
    ...exerciseDecisionTreeLinks(),
  ];
}

export default function DecisionTrees() {
  return (
    <Fragment>
      <h1>Decision trees</h1>
      <Spacer size="md" />
      <ExplainableCard
        front={<ExerciseDecisionTree />}
        back={<div>Back content</div>}
      />
    </Fragment>
  );
}
