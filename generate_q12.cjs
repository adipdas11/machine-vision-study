const fs = require('fs');

const svg = `
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 800 500" width="1200" height="900" style="background-color: white; font-family: sans-serif;">
  <!-- Grid -->
  <g stroke="#e5e7eb" stroke-width="1" stroke-dasharray="4" opacity="0.8">
    <line x1="80" y1="50" x2="750" y2="50" />
    <line x1="80" y1="150" x2="750" y2="150" />
    <line x1="80" y1="250" x2="750" y2="250" />
    <line x1="80" y1="350" x2="750" y2="350" />
    <line x1="80" y1="450" x2="750" y2="450" />
    <line x1="750" y1="50" x2="750" y2="450" />
  </g>

  <!-- Axes -->
  <line x1="80" y1="50" x2="80" y2="450" stroke="#374151" stroke-width="3" />
  <line x1="80" y1="450" x2="750" y2="450" stroke="#374151" stroke-width="3" />

  <!-- Title & Axis Labels -->
  <text x="415" y="35" font-size="24" font-weight="bold" fill="#111827" text-anchor="middle">Training vs Validation Loss (Overfitting)</text>
  <text x="415" y="490" font-size="16" fill="#4b5563" text-anchor="middle">Training Epochs</text>
  <text x="30" y="250" font-size="16" fill="#4b5563" text-anchor="middle" transform="rotate(-90 30 250)">Error / Loss</text>

  <!-- Training Error Curve -->
  <path d="M 80 150 Q 200 400 700 420" fill="none" stroke="#2563eb" stroke-width="5" />
  
  <!-- Validation Error Curve -->
  <path d="M 80 170 Q 200 370 350 350 T 700 150" fill="none" stroke="#dc2626" stroke-width="5" />

  <!-- Optimal Point Line -->
  <line x1="330" y1="50" x2="330" y2="450" stroke="#6b7280" stroke-width="3" stroke-dasharray="6" />
  
  <circle cx="330" cy="358" r="8" fill="#dc2626" />
  <text x="350" y="330" font-size="16" font-weight="bold" fill="#dc2626">Overfitting Begins</text>
  <text x="350" y="350" font-size="14" fill="#6b7280">(Validation loss starts rising)</text>
  
  <text x="310" y="475" font-size="14" font-weight="bold" fill="#6b7280" text-anchor="middle">Optimal Stopping</text>

  <!-- Legend -->
  <rect x="560" y="60" width="170" height="90" fill="white" stroke="#e5e7eb" stroke-width="2" rx="8" />
  <line x1="580" y1="85" x2="610" y2="85" stroke="#dc2626" stroke-width="5" />
  <text x="620" y="90" font-size="14" font-weight="bold" fill="#4b5563">Validation Loss</text>
  <line x1="580" y1="115" x2="610" y2="115" stroke="#2563eb" stroke-width="5" />
  <text x="620" y="120" font-size="14" font-weight="bold" fill="#4b5563">Training Loss</text>
</svg>
`;

fs.writeFileSync('C:/Users/adipd/Documents/Paper_Banana/machine-vision-study-companion/public/images/q12_overfitting.svg', svg);
