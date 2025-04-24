let bottleImg;
let sockImg;
let angle = 0;
let rotating = false;
let bgm;
let fft;

function preload() {
  bottleImg = loadImage('Subject 2.png');
  sockImg = loadImage('sock.png');
  bgm = loadSound('Bag Raiders - Shooting Stars (Instrumental) (1).mp3');
}

function setup() {
  createCanvas(windowWidth, windowHeight); // ← 自適應裝置大小
  imageMode(CENTER);
  bgm.setVolume(0.3);
  bgm.playMode('sustain');
  fft = new p5.FFT();
}

function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
}



function draw() {
  background(255);
  translate(width / 2, height / 2);

  // 抓頻譜資料
  fft.analyze();
  let bass = fft.getEnergy("bass");

  if (!rotating) {
    // 跳動更明顯：改變 scale 範圍
    let scaleFactor = map(bass, 0, 255, 0.7, 1.5);

    push();
    scale(scaleFactor);
    image(sockImg, 0, 0, 300, 300);
    pop();
  } else {
    angle += 0.10;
    rotate(angle);
    image(bottleImg, 0, 0, 500, 500);
  }
}

function mousePressed() {
  handleInteraction(); // 桌機滑鼠點擊
}

function touchStarted() {
  handleInteraction(); // 手機觸控點擊
}

function handleInteraction() {
  rotating = !rotating;

  if (!bgm.isPlaying()) {
    bgm.play(0, 1, 0.3, 80, 20); // 播放音樂
  }
}


