import { useRef } from "react";
import useBrowserLayoutEffect from "../use-browser-layout-effect/use-browser-layout-effect";

const useResizeObserver = <ElementType extends HTMLElement>(
  ref: React.MutableRefObject<ElementType | null>,
  onResize: (element: ElementType) => void,
  dependencyArray: any[]
): void => {
  const resizeObserver = useRef<ResizeObserver | null>(null);
  const onResizeCallback = useRef(onResize);

  useBrowserLayoutEffect(() => {
    onResizeCallback.current = onResize;
  }, [onResize, ...dependencyArray]);

  useBrowserLayoutEffect(() => {
    resizeObserver.current = new ResizeObserver(() => {
      if (!ref.current) return;
      onResizeCallback.current(ref.current);
    });
    const element = ref.current;
    if (element) {
      resizeObserver.current.observe(element);
      return () => resizeObserver.current?.unobserve(element);
    }
  }, []);
};

export default useResizeObserver;
