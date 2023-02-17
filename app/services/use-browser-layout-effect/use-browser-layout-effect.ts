import { useLayoutEffect } from "react";

// ideally this shouldn't be necessary and we are only supressing an warning
// relevant thread of discussion can be found at https://gist.github.com/gaearon/e7d97cdf38a2907924ea12e4ebdf3c85
const useBrowserLayoutEffect =
  typeof window !== "undefined" ? useLayoutEffect : () => {};

export default useBrowserLayoutEffect;
