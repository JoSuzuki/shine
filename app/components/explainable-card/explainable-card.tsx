import type { CSSProperties } from "react";
import { useRef } from "react";
import { useState } from "react";
import React from "react";
import ButtonSecondary, {
  links as buttonSecondaryLinks,
} from "../button/button-secondary";
import styles from "./explainable-card.css";
import useBrowserLayoutEffect from "../../services/use-browser-layout-effect/use-browser-layout-effect";

export function links() {
  return [...buttonSecondaryLinks(), { rel: "stylesheet", href: styles }];
}

export default function ExplainableCard({
  front,
  back,
}: {
  front: React.ReactNode;
  back: React.ReactNode;
}) {
  const [flip, setFlip] = useState(false);
  const [height, setHeight] = useState(0);
  const frontRef = useRef<HTMLDivElement>(null);
  const backRef = useRef<HTMLDivElement>(null);
  useBrowserLayoutEffect(() => {
    const frontHeight = frontRef.current?.scrollHeight ?? 0;
    const backHeight = backRef.current?.scrollHeight ?? 0;
    const maxHeight = Math.max(frontHeight, backHeight);
    if (maxHeight !== height) {
      setHeight(maxHeight);
    }
  }, [height]);

  return (
    <div className="explainable-card-wrapper">
      <div
        style={
          {
            "--height": `${height}px`,
            "--rotation": flip ? "180deg" : "0deg",
          } as CSSProperties
        }
        className="explainable-card-content"
      >
        <div
          ref={frontRef}
          className="explainable-card-front"
          aria-hidden={flip!}
        >
          <div className="explainable-card-front-content">{front}</div>
          <div className="explainable-card-front-footer">
            <ButtonSecondary
              onClick={() => setFlip(true)}
              {...(flip && { tabIndex: -1 })}
            >
              Show explanation
            </ButtonSecondary>
          </div>
        </div>
        <div
          ref={backRef}
          className="explainable-card-back"
          aria-hidden={flip!}
        >
          <div className="explainable-card-back-content">{back}</div>
          <div className="explainable-card-back-footer">
            <ButtonSecondary
              onClick={() => setFlip(false)}
              {...(!flip && { tabIndex: -1 })}
            >
              Back to problem
            </ButtonSecondary>
          </div>
        </div>
      </div>
    </div>
  );
}
