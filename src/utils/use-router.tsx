import { useState, useEffect, useCallback } from "react";

export function useRouter() {
  const getPath = () => {
    const hash = window.location.hash.slice(1);
    return hash || "/";
  };

  const [path, setPath] = useState(getPath);

  useEffect(() => {
    const handler = () => setPath(getPath());
    window.addEventListener("hashchange", handler);
    return () => window.removeEventListener("hashchange", handler);
  }, []);

  const navigate = useCallback((to: string) => {
    window.location.hash = to;
    setPath(to);
  }, []);

  return { path, navigate };
}

export function Link({
  href,
  children,
  className,
  onClick,
}: {
  href: string;
  children: React.ReactNode;
  className?: string;
  onClick?: () => void;
}) {
  const handleClick = (e: React.MouseEvent) => {
    e.preventDefault();
    window.location.hash = href;
    onClick?.();
  };
  return (
    <a href={`#${href}`} className={className} onClick={handleClick}>
      {children}
    </a>
  );
}
