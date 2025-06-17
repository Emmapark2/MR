// script.js

function updateTime() {
    // 카타르 시간 (Asia/Qatar)
    const qatar = new Date().toLocaleTimeString("en-US", {
      hour: '2-digit',
      minute: '2-digit',
      timeZone: 'Asia/Qatar',
      hour12: false
    });
  
    // 한국 시간 (Asia/Seoul)
    const korea = new Date().toLocaleTimeString("ko-KR", {
      hour: '2-digit',
      minute: '2-digit',
      timeZone: 'Asia/Seoul',
      hour12: false
    });
  
    // HTML에 표시
    document.getElementById("qatar-time").textContent = qatar;
    document.getElementById("korea-time").textContent = korea;
  }
  
  // 1초마다 시간 업데이트
  setInterval(updateTime, 1000);
  updateTime(); // 페이지 열자마자 바로 표시
function updateDate() {
  const today = new Date();
  const year = today.getFullYear();
  const month = ('0' + (today.getMonth() + 1)).slice(-2);
  const day = ('0' + today.getDate()).slice(-2);
  const dateString = `${year}. ${month}. ${day}.`;
  document.getElementById("current-date").textContent = dateString;
}

// DOMContentLoaded ensures everything is loaded first
document.addEventListener('DOMContentLoaded', function () {
  // 🎵 배경 음악
  const music = document.getElementById('bg-music');
  const soundBtn = document.getElementById('sound-btn');

  soundBtn.addEventListener('click', function () {
    if (music.paused) {
      music.play();
    } else {
      music.pause();
    }
  });

  // 🖼 Memory Archive 팝업 (그리드 이미지)
  const memoryBtn = document.getElementById('memory-btn');
  const memoryOverlay = document.getElementById('memory-overlay');
  const closeBtn = document.getElementById('close-memory');

  memoryBtn.addEventListener('click', function () {
    memoryOverlay.classList.toggle('hidden');
  });

  closeBtn.addEventListener('click', function () {
    memoryOverlay.classList.add('hidden');
  });

  // 🎬 한국 영상 설명 (영상 팝업)
  const koreaBtn = document.getElementById('korea-video-btn');
  const videoOverlay = document.getElementById('video-overlay');
  const closeVideoBtn = document.getElementById('close-video');
  const koreaVideo = document.getElementById('korea-video');

  // 버튼을 눌렀을 때만 안전하게 영상 재생
  koreaBtn.addEventListener('click', function () {
    videoOverlay.classList.remove('hidden');
    koreaVideo.currentTime = 0;

    koreaVideo.play().catch((err) => {
      console.warn('자동 재생 차단됨:', err);
    });
  });

  // 영상 닫기 버튼
  closeVideoBtn.addEventListener('click', function () {
    videoOverlay.classList.add('hidden');
    koreaVideo.pause();
    koreaVideo.currentTime = 0;
  });
});

// 이미지 설명 데이터
const imageDescriptions = {
  "m1.png": "<The Memory Archive> is an immersive installation that explores the theme of memory through a blend of photographs and ambient sound.",
  "m2.png": "Visitors will walk through a dimly lit space, designed to resemble a darkroom, symbolizing how memories develop over time.",
  "m3.png": "Photos are Memory",
  "m4.png": "The photographs will be suspended in a way that invites visitors to freely navigate and engage with them, while ambient sounds bring each memory to life.",
  "m5.png": "At the center, all memories will converge, representing the interconnectedness of human experiences and how many share similar moments of significance.",
  "m6.png": "This fusion of sight and sound creates an emotional journey, inviting visitors to connect deeply with the past.",
  "m7.png": "In the video, the process of memories emerging is presented in a more narrative form.",
  "m8.png": "In an unclear space, a slowly approaching train seems to symbolize the unpredictable nature of how memories suddenly emerge.",
  "m9.png": "Amidst the constantly passing scenes from the past, visitors become immersed in a journey to find their own personal memories."
};

document.querySelectorAll('#memory-popup img').forEach(img => {
  img.addEventListener('click', () => {
    const popup = document.getElementById('image-popup');
    const popupImg = document.getElementById('popup-image');
    const desc = document.getElementById('image-description');

    popupImg.classList.remove('animate');
    popupImg.src = img.src;

    popupImg.onload = () => {
      popupImg.classList.add('animate');
    };

    const filename = img.src.split('/').pop(); // m1.png 등
    desc.textContent = imageDescriptions[filename] || 'No description available';

    popup.classList.remove('hidden');
  });
});

document.getElementById('close-image-popup').addEventListener('click', () => {
  document.getElementById('image-popup').classList.add('hidden');
});

// 🗓 날짜 초기 출력 함수 (외부에서 정의되어 있다고 가정)
updateDate(); // 페이지가 열릴 때 날짜를 한 번 출력
