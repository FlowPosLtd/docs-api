/** The FlowPOS mark. */
export function FlowPOSIcon({ className }: { className?: string }) {
  return (
    <svg
      className={className}
      viewBox="0 0 43 43"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M9.82 0C4.4 0 0 4.39 0 9.82V32.54C0 37.97 4.4 42.36 9.82 42.36H32.54C37.97 42.36 42.36 37.96 42.36 32.54V9.82C42.37 4.39 37.98 0 32.55 0H9.82Z"
        fill="url(#fp-g)"
      />
      <path
        d="M33.48 13.58H8.9C6.7 13.58 4.92 11.8 4.92 9.61C4.92 7.41 6.7 5.64 8.9 5.64H33.48C35.67 5.64 37.45 7.42 37.45 9.62C37.45 11.81 35.67 13.58 33.48 13.58Z"
        fill="white"
      />
      <path
        d="M21.18 25.15H8.9C6.7 25.15 4.92 23.37 4.92 21.18C4.92 18.98 6.7 17.2 8.9 17.2H21.18C23.38 17.2 25.16 18.98 25.16 21.18C25.16 23.38 23.38 25.15 21.18 25.15Z"
        fill="white"
      />
      <path
        d="M15.05 36.72H8.9C6.7 36.72 4.92 34.94 4.92 32.74C4.92 30.55 6.7 28.77 8.9 28.77H15.05C17.24 28.77 19.02 30.55 19.02 32.74C19.01 34.95 17.23 36.72 15.05 36.72Z"
        fill="white"
      />
      <defs>
        <linearGradient
          id="fp-g"
          x1="-0.62"
          y1="42.99"
          x2="44.14"
          y2="-1.78"
          gradientUnits="userSpaceOnUse"
        >
          <stop stopColor="#7728EB" />
          <stop offset="1" stopColor="#E876E1" />
        </linearGradient>
      </defs>
    </svg>
  );
}
