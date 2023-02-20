import { useEffect, useState } from "react";
import ButtonSecondary, {
  links as buttonSecondaryLinks,
} from "../button/button-secondary";
import styles from "./exercise-submit.css";

export function links() {
  return [...buttonSecondaryLinks(), { rel: "stylesheet", href: styles }];
}

export default function ExerciseSubmit<ExerciseName extends string>({
  fetcherData,
  exerciseName,
}: {
  fetcherData: { [Key in ExerciseName]: { errors: string[] } } | undefined;
  exerciseName: ExerciseName;
}) {
  const [resetAriaLive, setResetAriaLive] = useState(Math.random());

  const answered = fetcherData?.[exerciseName] !== undefined;
  const errors = fetcherData?.[exerciseName]?.errors;
  const correct = errors?.length === 0 ?? false;

  useEffect(() => {
    if (!correct) {
      setResetAriaLive(Math.random());
    }
  }, [errors, correct]);

  return (
    <div className="exercise-submit-container">
      {!correct && (
        <ButtonSecondary value={exerciseName}>Check</ButtonSecondary>
      )}
      <div aria-live="polite">
        {answered &&
          (correct ? (
            "🎉 Correct!"
          ) : (
            <div
              key={resetAriaLive}
              className="exercise-submit-error-container"
            >
              {errors?.join(" ")}
            </div>
          ))}
      </div>
    </div>
  );
}
