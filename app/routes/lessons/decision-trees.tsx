import { Fragment } from "react";
import DecisionTree from "../../components/decision-tree/decision-tree";
import ExplainableCard, {
  links as explainableCardLinks,
} from "../../components/explainable-card/explainable-card";
import Spacer, { links as spacerLinks } from "../../components/spacer/spacer";

export function links() {
  return [...spacerLinks(), ...explainableCardLinks()];
}

export default function DecisionTrees() {
  return (
    <Fragment>
      <h1>Decision trees</h1>
      <Spacer size="md" />
      <ExplainableCard
        front={
          <div>
            What would the computer output if presented with a frowning face
            with short brown hair and glasses, and no beard?
            <DecisionTree />
          </div>
        }
        back={<div>Back content</div>}
      />
    </Fragment>
  );
}
