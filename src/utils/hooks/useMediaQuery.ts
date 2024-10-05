import { useState, useEffect } from "react";

const useMediaQuery = (query: string): boolean => {
  // State to hold the matched value
  const [matches, setMatches] = useState<boolean>(false);

  useEffect(() => {
    const mediaQuery = window.matchMedia(query);

    // Set the initial state based on the current viewport
    setMatches(mediaQuery.matches);

    // Event handler to set state when the viewport matches the media query
    const handler = (event: MediaQueryListEvent) => {
      setMatches(event.matches);
    };

    // Attach event listener
    mediaQuery.addEventListener("change", handler);

    // Clean up - remove event listener
    return () => mediaQuery.removeEventListener("change", handler);
  }, [query]); // Re-run effect only if query changes

  return matches;
};

export default useMediaQuery;
