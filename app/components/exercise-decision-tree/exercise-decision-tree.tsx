import { useRef, useState } from "react";
import useBrowserLayoutEffect from "../../services/use-browser-layout-effect/use-browser-layout-effect";
import DecisionTreeSvg from "./decision-tree-svg";
import styles from "./exercise-decision-tree.css";

export function links() {
  return [{ rel: "stylesheet", href: styles }];
}

const decisionTreeSvgAlternativesCount = 8;
const gravity = 0.8;

const labelsForIndexes = [
  "beard true",
  "beard false, purple hair true",
  "beard false, purple hair false, smiling true, blue hair true",
  "beard false, purple hair false, smiling true, blue hair false, long hair true",
  "beard false, purple hair false, smiling true, blue hair false, long hair false, black hair true, glasses true",
  "beard false, purple hair false, smiling true, blue hair false, long hair false, black hair true, glasses false",
  "beard false, purple hair false, smiling true, blue hair false, long hair false, black hair false",
  "beard false, purple hair false, smiling false",
];

export default function ExerciseDecisionTree() {
  const wrapperRef = useRef<HTMLDivElement>(null);
  const markerRef = useRef<HTMLDivElement>(null);
  const [selectedAlternative, setSelectedAlternative] = useState(0);
  const [isMoving, setIsMoving] = useState(false);
  const initialClickPositionWithinMarker = useRef(0); // prevents flicker during initial movement of marker
  const markerLeftPosition = useRef(0);

  const stopMovingMarker = (e: MouseEvent) => {
    setIsMoving(false);

    if (wrapperRef.current) {
      const wrapperDimensions = wrapperRef.current.getBoundingClientRect();
      const interval =
        wrapperDimensions.width / decisionTreeSvgAlternativesCount;
      const alternativeBuckets = [
        ...Array(decisionTreeSvgAlternativesCount),
      ].map((_, index) => {
        return (index + 1) * interval;
      });

      const aboveAlternativeIndex = alternativeBuckets.findIndex(
        (bucket) => markerLeftPosition.current <= bucket
      );

      setSelectedAlternative(aboveAlternativeIndex);
    }
  };

  const startMovingMarker = (e: React.MouseEvent<HTMLDivElement>) => {
    if (markerRef.current) {
      const markerRefLeft = markerRef.current.getBoundingClientRect().left;
      e.preventDefault(); // stops text being selected when dragging
      setIsMoving(true);
      initialClickPositionWithinMarker.current = e.clientX - markerRefLeft;
    }
  };

  useBrowserLayoutEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (wrapperRef.current && markerRef.current) {
        e.preventDefault(); // stops text being selected when dragging
        const wrapperDimensions = wrapperRef.current.getBoundingClientRect();
        const markerDimensions = markerRef.current.getBoundingClientRect();
        const wrapperLeft = wrapperDimensions.left;
        const interval =
          wrapperDimensions.width / decisionTreeSvgAlternativesCount;
        const rightBoundary = wrapperDimensions.width - markerDimensions.width;

        const markerLeftOffset =
          e.clientX - wrapperLeft - initialClickPositionWithinMarker.current;
        const markerLeftOffsetWithinWrapperBoundaries = Math.min(
          Math.max(markerLeftOffset, 0),
          rightBoundary
        );

        const alternativeBuckets = [
          ...Array(decisionTreeSvgAlternativesCount),
        ].map((_, index) => {
          return (index + 1) * interval;
        });

        const aboveAlternativeIndex = alternativeBuckets.findIndex(
          (bucket) => markerLeftOffsetWithinWrapperBoundaries <= bucket
        );

        const alternativeCenter =
          aboveAlternativeIndex * interval + interval / 2;

        const markerLeftWithGravityTowardsAlternativeCenter =
          markerLeftOffsetWithinWrapperBoundaries +
          (alternativeCenter -
            markerDimensions.width / 2 -
            markerLeftOffsetWithinWrapperBoundaries) *
            gravity;

        markerLeftPosition.current =
          markerLeftWithGravityTowardsAlternativeCenter;
        markerRef.current.style.transform = `translateX(${markerLeftPosition.current}px)`;
      }
    };

    if (isMoving) {
      window.addEventListener("mousemove", handleMouseMove);
      window.addEventListener("mouseup", stopMovingMarker);
      window.addEventListener("mouseleave", stopMovingMarker);
    }
    return () => {
      if (isMoving) {
        window.removeEventListener("mousemove", handleMouseMove);
        window.removeEventListener("mouseup", stopMovingMarker);
        window.removeEventListener("mouseleave", stopMovingMarker);
      }
    };
  }, [isMoving]);

  useBrowserLayoutEffect(() => {
    if (wrapperRef.current && markerRef.current) {
      const wrapperDimensions = wrapperRef.current.getBoundingClientRect();
      const markerDimensions = markerRef.current.getBoundingClientRect();
      const interval =
        wrapperDimensions.width / decisionTreeSvgAlternativesCount;
      markerRef.current.style.transform = `translateX(${
        selectedAlternative * interval +
        interval / 2 -
        markerDimensions.width / 2
      }px)`;
    }
  }, [selectedAlternative]);

  return (
    <div
      role="radiogroup"
      aria-labelledby="exercise-decision-tree-label"
      ref={wrapperRef}
      className="exercise-decision-tree-wrapper"
    >
      <div id="exercise-decision-tree-label">
        What would the computer output if presented with a frowning face with
        short brown hair and glasses, and no beard?
      </div>
      <DecisionTreeSvg />
      <div className="exercise-decision-tree-alternatives-wrapper">
        {[...Array(8)].map((_, index) => (
          <input
            aria-label={`${labelsForIndexes[index]}`}
            key={index}
            type="radio"
            value={index}
            checked={index === selectedAlternative}
            onChange={(e) => setSelectedAlternative(Number(e.target.value))}
          />
        ))}
      </div>
      <div
        ref={markerRef}
        className={[
          "exercise-decision-tree-marker",
          isMoving && "exercise-decision-tree-marker--active",
        ]
          .filter(Boolean)
          .join(" ")}
        onMouseDown={startMovingMarker}
      />
    </div>
  );
}
