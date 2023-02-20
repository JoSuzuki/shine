import type { CSSProperties } from "react";
import { useCallback } from "react";
import { useRef } from "react";
import { useState } from "react";
import React from "react";
import ButtonSecondary, {
  links as buttonSecondaryLinks,
} from "../button/button-secondary";
import styles from "./explainable-card.css";
import useBrowserLayoutEffect from "../../services/use-browser-layout-effect/use-browser-layout-effect";
import useResizeObserver from "../../services/use-resize-observer/use-resize-observer";

const EXPLAINABLE_CARD_CONTENT_PADDING = 16;

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
  const backContentRef = useRef<HTMLDivElement>(null);
  const backContentHeightRef = useRef<HTMLDivElement>(null);
  const backFooterHeightRef = useRef<HTMLDivElement>(null);

  const setCardHeight = useCallback(() => {
    if (
      frontRef.current &&
      backContentHeightRef.current &&
      backFooterHeightRef.current
    ) {
      const frontHeight = frontRef.current.scrollHeight ?? 0;
      const backHeight =
        backContentHeightRef.current.scrollHeight +
          backFooterHeightRef.current.scrollHeight +
          2 * EXPLAINABLE_CARD_CONTENT_PADDING ?? 0;
      const maxHeight = Math.max(frontHeight, backHeight);
      if (maxHeight !== height) {
        setHeight(maxHeight);
      }
    }
  }, [height]);

  useResizeObserver(
    frontRef,
    () => {
      setCardHeight();
    },
    []
  );

  useResizeObserver(
    backContentHeightRef,
    () => {
      setCardHeight();
    },
    []
  );

  useBrowserLayoutEffect(() => {
    setCardHeight();
  }, [setCardHeight]);

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
              onClick={() => {
                setFlip(true);
                backContentRef.current?.focus();
              }}
              {...(flip && { tabIndex: -1 })}
            >
              Show explanation
            </ButtonSecondary>
          </div>
        </div>
        <div className={"explainable-card-back"} aria-hidden={!flip}>
          <div
            ref={backContentRef}
            className="explainable-card-back-content"
            tabIndex={-1}
          >
            <div ref={backContentHeightRef}>{back}</div>
          </div>
          <div
            ref={backFooterHeightRef}
            className="explainable-card-back-footer"
          >
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
