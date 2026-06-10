import { useNavigate, useLocation, Link as RRLink } from 'react-router-dom';

export function useRouter() {
  const location = useLocation();
  const rrNavigate = useNavigate();

  const path = location.pathname || '/';

  const navigate = (to: string) => {
    rrNavigate(to);
  };

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
  return (
    <RRLink to={href} className={className} onClick={onClick}>
      {children}
    </RRLink>
  );
}
