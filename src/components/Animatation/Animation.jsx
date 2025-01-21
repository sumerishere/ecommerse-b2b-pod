import "./Animation.css";

const Animation = () => {
  return (
    <div className="animation-root">
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 800 400">
        <rect width="800" height="400" fill="#f8fafc" />
        <path d="M0 350 Q 400 300 800 350 L 800 400 L 0 400 Z" fill="#e2e8f0" />

        <g id="truck" transform="translate(0, 300)">
          <animateTransform
            attributeName="transform"
            type="translate"
            from="-200 300"
            to="1000 300"
            dur="10s"
            repeatCount="indefinite"
          />
          <rect x="0" y="0" width="120" height="60" fill="#3b82f6" rx="10" />
          <rect x="120" y="20" width="40" height="40" fill="#3b82f6" rx="5" />
          <circle cx="30" cy="60" r="15" fill="#1e3a8a" />
          <circle cx="90" cy="60" r="15" fill="#1e3a8a" />
          <text x="12" y="16" fill="white" fontSize="10">
            Bulkify B2B
          </text>
          <text x="12" y="36" fill="white" fontSize="13">
           Ready! to Deliver
          </text>
        </g>

        <g id="box1">
          <animateTransform
            attributeName="transform"
            type="translate"
            values="0,0; 0,-10; 0,0"
            dur="2s"
            repeatCount="indefinite"
            
          />
          <rect x="300" y="200" width="40" height="40" fill="#3b82f6" rx="5" />
          <path d="M300 220 L340 220" stroke="white" strokeWidth="4" />
        </g>

        <g id="box2">
          <animateTransform
            attributeName="transform"
            type="translate"
            values="0,0; 0,-10; 0,0"
            dur="2s"
            begin="0.7s"
            repeatCount="indefinite"
          />
          <rect x="400" y="180" width="40" height="40" fill="#3b82f6" rx="5" />
          <path d="M400 200 L440 200" stroke="white" strokeWidth="4" />
        </g>

        <g>
          <rect x="100" y="150" width="80" height="250"  fill="#94a3b8" />
          <rect x="120" y="170" width="20" height="20" fill="white" />
          <rect x="150" y="170" width="20" height="20" fill="white" />
          <rect x="120" y="200" width="20" height="20" fill="white" />
          <rect x="150" y="200" width="20" height="20" fill="white" />
        </g>

        <g>
          <rect x="600" y="100" width="100" height="280" fill="#94a3b8" />
          <rect x="620" y="120" width="25" height="25" fill="white" />
          <rect x="655" y="120" width="25" height="25" fill="white" />
          <rect x="620" y="155" width="25" height="25" fill="white" />
          <rect x="655" y="155" width="25" height="25" fill="white" />
        </g>

        <g>
          <line
            x1="200"
            y1="250"
            x2="580"
            y2="250"
            stroke="#3b82f6"
            strokeWidth="2"
            strokeDasharray="5,5"
          >
            <animate
              attributeName="strokeDashoffset"
              from="0"
              to="20"
              dur="1s"
              repeatCount="indefinite"
            />
          </line>
        </g>

        <g fill="white">
          <circle cx="150" cy="100" r="20" />
          <circle cx="180" cy="100" r="25" />
          <circle cx="200" cy="100" r="20" />

          <circle cx="650" cy="80" r="20" />
          <circle cx="680" cy="80" r="25" />
          <circle cx="700" cy="80" r="20" />
        </g>
      </svg>
    </div>
  );
};
export default Animation;
