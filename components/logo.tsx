export function Logo({ className = "w-8 h-8" }: { className?: string }) {
  return (
    <svg 
      className={className} 
      viewBox="0 0 100 100" 
      fill="none" 
      xmlns="http://www.w3.org/2000/svg"
    >
      {/* Gradient background circle */}
      <defs>
        <linearGradient id="logoGradient" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" style={{ stopColor: '#3b82f6', stopOpacity: 1 }} />
          <stop offset="100%" style={{ stopColor: '#8b5cf6', stopOpacity: 1 }} />
        </linearGradient>
      </defs>
      
      {/* Circle background */}
      <circle cx="50" cy="50" r="45" fill="url(#logoGradient)" />
      
      {/* Integration symbol - connected nodes */}
      <circle cx="30" cy="35" r="6" fill="white" />
      <circle cx="70" cy="35" r="6" fill="white" />
      <circle cx="50" cy="65" r="6" fill="white" />
      
      {/* Connection lines */}
      <line x1="30" y1="35" x2="70" y2="35" stroke="white" strokeWidth="3" />
      <line x1="30" y1="35" x2="50" y2="65" stroke="white" strokeWidth="3" />
      <line x1="70" y1="35" x2="50" y2="65" stroke="white" strokeWidth="3" />
      
      {/* Center hub */}
      <circle cx="50" cy="45" r="8" fill="white" />
      <circle cx="50" cy="45" r="5" fill="url(#logoGradient)" />
    </svg>
  );
}

