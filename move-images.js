const fs = require('fs');
const path = require('path');

const publicProjectsDir = path.join(__dirname, 'public', 'projects');

if (!fs.existsSync(publicProjectsDir)) {
  fs.mkdirSync(publicProjectsDir, { recursive: true });
}

// Source images mapped to their final names
const imagesToMove = [
  { src: 'C:\\Users\\ASUS\\Pictures\\Screenshots\\Screenshot 2026-05-19 164250.png', dest: 'pharmatrack.png' },
  { src: 'C:\\Users\\ASUS\\Pictures\\Screenshots\\Screenshot 2026-05-19 164409.png', dest: 'commit.png' },
  { src: 'C:\\Users\\ASUS\\Pictures\\Screenshots\\Screenshot 2026-05-19 164503.png', dest: 'signsync.png' },
  { src: path.join(__dirname, 'BINSENSE1.jpg'), dest: 'binsense1.jpg' },
  { src: path.join(__dirname, 'BINSENSE2.jpg'), dest: 'binsense2.jpg' },
];

imagesToMove.forEach(({ src, dest }) => {
  const destPath = path.join(publicProjectsDir, dest);
  try {
    fs.copyFileSync(src, destPath);
    console.log(`Copied ${dest} successfully!`);
  } catch (err) {
    console.error(`Error copying ${src}:`, err.message);
  }
});
console.log('\nAll images copied! The app will now be able to render them.');
