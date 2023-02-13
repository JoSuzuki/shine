import { Fragment } from "react";
import ExplainableCard, {
  links as explainableCardLinks,
} from "../../components/explainable-card/explainable-card";

export function links() {
  return [...explainableCardLinks()];
}

export default function DecisionTrees() {
  return (
    <Fragment>
      <h1>Decision trees</h1>
      <ExplainableCard
        front={
          <div>
            Front content Front contentFront contentFront contentFront
            contentFront content
          </div>
        }
        back={<div>Back content</div>}
      />
    </Fragment>
  );
}
