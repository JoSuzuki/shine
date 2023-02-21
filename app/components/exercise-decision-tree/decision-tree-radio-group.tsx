import { useCallback, useRef, useState } from "react";
import useBrowserLayoutEffect from "../../services/use-browser-layout-effect/use-browser-layout-effect";
import DecisionTreeSvg from "./decision-tree-svg";
import styles from "./decision-tree-radio-group.css";

export function links() {
  return [{ rel: "stylesheet", href: styles }];
}

const DECISION_TREE_SVG_ALTERNATIVES_COUNT = 8;
const GRAVITY = 0.8;

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

export default function DecisionTreeRadio({
  name,
  label,
  selectedAlternative,
  onSelectedAlternativeChange,
}: {
  name: string;
  label: string;
  selectedAlternative: number;
  onSelectedAlternativeChange: (selectedAlternative: number) => void;
}) {
  const wrapperRef = useRef<HTMLDivElement>(null);
  const markerRef = useRef<HTMLDivElement>(null);
  const [isMoving, setIsMoving] = useState(false);
  const initialClickPositionWithinMarker = useRef(0); // prevents flicker during initial movement of marker
  const markerLeftPosition = useRef(0);

  const snapMarkerToAlternative = useCallback((selectedAlternative: number) => {
    if (wrapperRef.current && markerRef.current) {
      const wrapperDimensions = wrapperRef.current.getBoundingClientRect();
      const markerDimensions = markerRef.current.getBoundingClientRect();
      const interval =
        wrapperDimensions.width / DECISION_TREE_SVG_ALTERNATIVES_COUNT;
      markerRef.current.style.transform = `translateX(${
        selectedAlternative * interval +
        interval / 2 -
        markerDimensions.width / 2
      }px)`;
    }
  }, []);

  useBrowserLayoutEffect(() => {
    snapMarkerToAlternative(selectedAlternative);
  }, [selectedAlternative, snapMarkerToAlternative]);
  const stopMovingMarker = (e: MouseEvent) => {
    setIsMoving(false);

    if (wrapperRef.current) {
      const wrapperDimensions = wrapperRef.current.getBoundingClientRect();
      const interval =
        wrapperDimensions.width / DECISION_TREE_SVG_ALTERNATIVES_COUNT;
      const alternativeBuckets = [
        ...Array(DECISION_TREE_SVG_ALTERNATIVES_COUNT),
      ].map((_, index) => {
        return (index + 1) * interval;
      });

      const aboveAlternativeIndex = alternativeBuckets.findIndex(
        (bucket) => markerLeftPosition.current <= bucket
      );

      if (selectedAlternative !== aboveAlternativeIndex) {
        onSelectedAlternativeChange(aboveAlternativeIndex);
      } else {
        snapMarkerToAlternative(aboveAlternativeIndex);
      }
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
          wrapperDimensions.width / DECISION_TREE_SVG_ALTERNATIVES_COUNT;
        const rightBoundary = wrapperDimensions.width - markerDimensions.width;

        const markerLeftOffset =
          e.clientX - wrapperLeft - initialClickPositionWithinMarker.current;
        const markerLeftOffsetWithinWrapperBoundaries = Math.min(
          Math.max(markerLeftOffset, 0),
          rightBoundary
        );

        const alternativeBuckets = [
          ...Array(DECISION_TREE_SVG_ALTERNATIVES_COUNT),
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
            GRAVITY;

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

  return (
    <div
      role="radiogroup"
      aria-labelledby="decision-tree-radio-group-label"
      ref={wrapperRef}
      className="decision-tree-radio-group-wrapper"
    >
      <div id="decision-tree-radio-group-label">{label}</div>
      <DecisionTreeSvg />
      <div className="decision-tree-radio-group-alternatives-wrapper">
        {[...Array(8)].map((_, index) => (
          <input
            aria-label={`${labelsForIndexes[index]}`}
            key={index}
            name={name}
            type="radio"
            value={index}
            checked={index === selectedAlternative}
            onChange={(e) =>
              onSelectedAlternativeChange(Number(e.target.value))
            }
          />
        ))}
      </div>
      <div
        ref={markerRef}
        className={[
          "decision-tree-radio-group-marker",
          isMoving && "decision-tree-radio-group-marker--active",
        ]
          .filter(Boolean)
          .join(" ")}
        onMouseDown={startMovingMarker}
      />
    </div>
  );
}
