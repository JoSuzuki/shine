import { json } from "@remix-run/node";
import { useFetcher } from "@remix-run/react";
import { useState } from "react";
import ExerciseSubmit, {
  links as exerciseSubmitLinks,
} from "../exercise-submit/exercise-submit";
import Spacer, { links as spacerLinks } from "../spacer/spacer";
import DecisionTreeRadio, {
  links as decsionTreeRadioLinks,
} from "./decision-tree-radio-group";

export function links() {
  return [
    ...exerciseSubmitLinks(),
    ...decsionTreeRadioLinks(),
    ...spacerLinks(),
  ];
}

export const EXERCISE_NAME = "decision-tree-exercise-02" as const;

export default function ExerciseDecisionTree02() {
  const [selectedAlternative, setSelectedAlternative] = useState(0);
  const fetcher = useFetcher();

  return (
    <fetcher.Form method="post">
      <DecisionTreeRadio
        name={EXERCISE_NAME}
        label="What would the computer output if presented with a smiling face with short blond hair, no beard, and no glasses?"
        selectedAlternative={selectedAlternative}
        onSelectedAlternativeChange={(alternative) =>
          setSelectedAlternative(alternative)
        }
      />
      <Spacer size="md" />
      <ExerciseSubmit fetcherData={fetcher.data} exerciseName={EXERCISE_NAME} />
    </fetcher.Form>
  );
}

export async function action({
  formData,
}: {
  formData: { [Key in typeof EXERCISE_NAME]: string };
}) {
  const exercise02Response = formData[EXERCISE_NAME];

  if (exercise02Response !== "6") {
    return json({ [EXERCISE_NAME]: { errors: ["Not quite!"] } });
  }

  return json({ [EXERCISE_NAME]: { errors: [] } });
}
