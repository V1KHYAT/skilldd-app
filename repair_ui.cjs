const fs = require('fs');
let data = fs.readFileSync('index.html', 'utf8');

// 1. Fix Button Check-In SVG
data = data.replace(
  '<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path><polyline points="22 4 12 14.01 9 11.01"></polyline></svg>',
  '<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><line x1="5" y1="12" x2="19" y2="12"></line><polyline points="12 5 19 12 12 19"></polyline></svg>'
);

// 2. Fix Master Saxena padding
data = data.replace(
  '<section id="screen-expert" class="screen">',
  '<section id="screen-expert" class="screen" style="padding-top: 32px;">'
);

// 3. Fix map
data = data.replace(
  /<div class="map-card-aww">[\s\S]*?<img src="https:\/\/images[^>]+>\s*<div class="map-over">[\s\S]*?<\/div>\s*<\/div>/g,
  `<div class="map-card-minimal" style="background:#EAEAEA; height:180px; border-radius:var(--radius-lg); display:flex; align-items:center; justify-content:center;">
    <div class="map-badge-aww" style="background:#000; color:#FFF; padding:12px 24px; border-radius:100px; display:flex; align-items:center; gap:8px; font-weight:bold; font-size:14px;"><span class="dot-blue"></span> 12 Tools near you</div>
</div>`
);

// 4. Fix market pricing structure
data = data.replace(
  /<div class="card-image-box" style="height: 240px;">\s*<img src="([^"]+)" alt="([^"]+)" \/>\s*<div class="badge-px[^>]+>([^<]+)<\/div>\s*<\/div>\s*<div class="card-body-aww">\s*<h2 class="font-inktrap title-aww">([^<]+)<\/h2>/g,
  `<div class="card-image-box" style="height: 240px;">
    <img src="$1" alt="$2" />
 </div>
 <div class="card-body-aww">
    <div class="flex-between m-b-8">
      <h2 class="font-inktrap title-aww text-lg">$4</h2>
      <span class="font-inktrap font-bold text-lg text-blue">$3</span>
    </div>`
);

// 5. Replace all Unsplash images securely
let count = 100;
data = data.replace(/src="https:\/\/images\.unsplash\.com\/photo-[^"]+"/g, () => {
   count++;
   return `src="https://picsum.photos/600/400?random=${count}"`;
});

// Update Mentor avatar and passport avatar to keep them square
data = data.replace(/src="https:\/\/picsum\.photos\/600\/400\?random=118"/g, 'src="https://picsum.photos/150/150?random=118"');
data = data.replace(/src="https:\/\/picsum\.photos\/600\/400\?random=126"/g, 'src="https://picsum.photos/150/150?random=126"');

// Write back
fs.writeFileSync('index.html', data);
console.log('Successfully repaired index.html');
