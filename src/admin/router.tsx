import { useEffect, useState, type ReactNode } from "react";

function getHash() {
  const h = window.location.hash.replace(/^#/, "");
  if (h.startsWith("/")) return h;
  return "/" + h;
}

export function useRoute() {
  const [route, setRoute] = useState(getHash());
  useEffect(() => {
    const onHash = () => setRoute(getHash());
    window.addEventListener("hashchange", onHash);
    return () => window.removeEventListener("hashchange", onHash);
  }, []);
  return route;
}

export function navigate(path: string) {
  window.location.hash = path;
}

export function Router({ children }: { children: ReactNode }) {
  return <>{children}</>;
}
