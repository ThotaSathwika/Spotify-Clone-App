const songs = [
  {
    title: "Tiny Shell",
    artist: "Blue Deer, Nyles Lannon",
    album: "Ocean Lullaby",
    added: "2 days ago",
    cover: "images/album_cover_1_1778247774602.png",
    url: "audio/Tiny_Shell_-Blue_Deer_Nyles_Lannon_ao027j.mp3"
  },
  {
    title: "Working",
    artist: "Cory Barker feat. Jordan King",
    album: "Kinetic",
    added: "3 days ago",
    cover: "images/album_cover_2_1778247789055.png",
    url: "audio/Working-Cory_Barker_feat._Jordan_King_xjmmvc.mp3"
  },
  {
    title: "Working (Remix)",
    artist: "Cory Barker feat. Jordan King",
    album: "The Limits",
    added: "4 days ago",
    cover: "images/album_cover_3_1778247804490.png",
    url: "audio/Working-Cory_Barker_feat._Jordan_King_2_ruskxi.mp3"
  },
  {
    title: "Turn In The Sun",
    artist: "Simon Herody",
    album: "Arcade",
    added: "1 week ago",
    cover: "images/album_cover_4_1778247819092.png",
    url: "audio/Turn_In_The_Sun-Simon_Herody_mpbqh8.mp3"
  },
  {
    title: "Tonight Again",
    artist: "Rod Kim feat. Mostly Moss",
    album: "Tonight Again",
    added: "1 week ago",
    cover: "https://picsum.photos/seed/tonight/400/400",
    url: "audio/Tonight_Again-Rod_Kim_feat._Mostly_Moss_bvl2xm.mp3"
  },
  {
    title: "Through The Night",
    artist: "Blue Deer feat. Devyn Rush",
    album: "Through The Night",
    added: "2 weeks ago",
    cover: "https://picsum.photos/seed/night/400/400",
    url: "audio/Through_The_Night_feat._Devyn_Rush-Blue_Deer_q2sqdk.mp3"
  },
  {
    title: "The Fog",
    artist: "Trey Xavier, Rod Kim",
    album: "The Fog",
    added: "2 weeks ago",
    cover: "https://picsum.photos/seed/fog/400/400",
    url: "audio/The_Fog-Trey_Xavier_Rod_Kim_l8ufrf.mp3"
  },
  {
    title: "Find My Way",
    artist: "Blue Deer feat. Luqman Frank",
    album: "Find My Way",
    added: "3 weeks ago",
    cover: "https://picsum.photos/seed/way/400/400",
    url: "audio/Find_My_Way_feat._Luqman_Frank-Blue_Deer_y7y7ua.mp3"
  },
  {
    title: "Scratches On The B-Side",
    artist: "National Sweetheart",
    album: "Scratches",
    added: "1 month ago",
    cover: "https://picsum.photos/seed/scratch/400/400",
    url: "audio/Scratches_On_The_B-Side-National_Sweetheart_vzhu8n.mp3"
  },
  {
    title: "Taught Her How To Leave",
    artist: "Bill Douglas",
    album: "Taught Her How To Leave",
    added: "1 month ago",
    cover: "https://picsum.photos/seed/leave/400/400",
    url: "audio/Taught_Her_How_To_Leave-Bill_Douglas_2_krbrb7.mp3"
  },
  {
    title: "Chase The Sun",
    artist: "Bel Tempo",
    album: "Chase The Sun",
    added: "1 month ago",
    cover: "https://picsum.photos/seed/sun/400/400",
    url: "audio/Chase_The_Sun-_Bel_Tempo_toalje.mp3"
  }
];

const audio = document.getElementById("audio");
const trackList = document.getElementById("track-list");
const trackCount = document.getElementById("track-count");

const heroCover = document.getElementById("hero-cover");
const heroTitle = document.getElementById("hero-title");
const heroPlayBtn = document.getElementById("hero-play");

const miniCover = document.getElementById("mini-cover");
const nowPlayingInfo = document.getElementById("now-playing-info");
const nowTitle = document.getElementById("now-title");
const nowArtist = document.getElementById("now-artist");
const nowHeart = document.getElementById("now-heart");

const playBtn = document.getElementById("play-btn");
const prevBtn = document.getElementById("prev-btn");
const nextBtn = document.getElementById("next-btn");
const seekBar = document.getElementById("seek-bar");
const currentTimeEl = document.getElementById("current-time");
const totalTimeEl = document.getElementById("total-time");

const volumeBar = document.getElementById("volume-bar");
const volumeIcon = document.getElementById("volume-icon");

const mainScroll = document.getElementById("main-scroll");
const topbar = document.getElementById("topbar");
const menuToggle = document.getElementById("menu-toggle");
const sidebar = document.getElementById("sidebar");
const navOverlay = document.getElementById("nav-overlay");

let currentIndex = 0;
let isPlaying = false;

function isTypingContext(el) {
  if (!el || !el.tagName) return false;
  const tag = el.tagName.toLowerCase();
  return tag === "input" || tag === "textarea" || tag === "select" || el.isContentEditable;
}

function openMobileMenu() {
  sidebar.classList.add("sidebar--open");
  navOverlay.classList.add("nav-overlay--visible");
  navOverlay.setAttribute("aria-hidden", "false");
  menuToggle.setAttribute("aria-expanded", "true");
  menuToggle.setAttribute("aria-label", "Close menu");
}

function closeMobileMenu() {
  sidebar.classList.remove("sidebar--open");
  navOverlay.classList.remove("nav-overlay--visible");
  navOverlay.setAttribute("aria-hidden", "true");
  menuToggle.setAttribute("aria-expanded", "false");
  menuToggle.setAttribute("aria-label", "Open menu");
}

function toggleMobileMenu() {
  if (sidebar.classList.contains("sidebar--open")) closeMobileMenu();
  else openMobileMenu();
}

function formatTime(totalSeconds) {
  if (!Number.isFinite(totalSeconds) || totalSeconds < 0) return "0:00";
  const minutes = Math.floor(totalSeconds / 60);
  const seconds = Math.floor(totalSeconds % 60);
  return `${minutes}:${String(seconds).padStart(2, "0")}`;
}

function renderTracks() {
  trackList.innerHTML = "";
  trackCount.textContent = songs.length;

  songs.forEach((song, index) => {
    const row = document.createElement("div");
    row.className = "track-row";
    row.dataset.index = index;
    row.innerHTML = `
      <div class="col-center">
        <span class="row-num">${index + 1}</span>
        <i class="ri-play-fill row-play"></i>
      </div>
      <div class="col-title">
        <img src="${song.cover}" alt="cover">
        <div class="song-info">
          <span class="song-title">${song.title}</span>
          <span style="font-size: 12px;">${song.artist}</span>
        </div>
      </div>
      <span>${song.album}</span>
      <span>${song.added}</span>
      <span class="duration col-center">--:--</span>
    `;

    row.addEventListener("click", () => {
      if (index === currentIndex) {
        togglePlay();
      } else {
        loadSong(index);
        playSong();
      }
    });
    trackList.appendChild(row);

    const probe = new Audio(song.url);
    probe.addEventListener("loadedmetadata", () => {
      const d = row.querySelector(".duration");
      if (d) d.textContent = formatTime(probe.duration);
    });
  });
}

function updateActiveRow() {
  document.querySelectorAll(".track-row").forEach((row, index) => {
    const numEl = row.querySelector(".row-num");
    const playIco = row.querySelector(".row-play");
    const titleEl = row.querySelector(".song-title");

    if (index === currentIndex) {
      row.classList.add("active");
      numEl.style.display = "none";
      playIco.style.display = "block";
      playIco.classList.remove("ri-play-fill", "ri-pause-fill");
      playIco.classList.add(isPlaying ? "ri-pause-fill" : "ri-play-fill");
      titleEl.style.color = "var(--brand-color)";
    } else {
      row.classList.remove("active");
      numEl.style.display = "block";
      playIco.style.display = "none";
      playIco.classList.remove("ri-pause-fill");
      playIco.classList.add("ri-play-fill");
      titleEl.style.color = "";
    }
  });
}

function loadSong(index) {
  currentIndex = index;
  const song = songs[currentIndex];
  audio.src = song.url;
  
  heroCover.src = song.cover;
  heroTitle.textContent = song.title;

  miniCover.src = song.cover;
  miniCover.classList.remove("hidden");
  nowPlayingInfo.classList.remove("hidden");
  nowHeart.classList.remove("hidden");
  
  nowTitle.textContent = song.title;
  nowArtist.textContent = song.artist;
  
  currentTimeEl.textContent = "0:00";
  totalTimeEl.textContent = "0:00";
  seekBar.value = 0;
  
  updateActiveRow();
}

function playSong() {
  audio.play();
  isPlaying = true;
  playBtn.innerHTML = '<i class="ri-pause-fill"></i>';
  heroPlayBtn.innerHTML = '<i class="ri-pause-fill"></i>';
  updateActiveRow();
}

function pauseSong() {
  audio.pause();
  isPlaying = false;
  playBtn.innerHTML = '<i class="ri-play-fill"></i>';
  heroPlayBtn.innerHTML = '<i class="ri-play-fill"></i>';
  updateActiveRow();
}

function togglePlay() {
  if (isPlaying) {
    pauseSong();
  } else {
    playSong();
  }
}

function nextSong() {
  const nextIndex = (currentIndex + 1) % songs.length;
  loadSong(nextIndex);
  playSong();
}

function prevSong() {
  const prevIndex = (currentIndex - 1 + songs.length) % songs.length;
  loadSong(prevIndex);
  playSong();
}

playBtn.addEventListener("click", togglePlay);
heroPlayBtn.addEventListener("click", togglePlay);
nextBtn.addEventListener("click", nextSong);
prevBtn.addEventListener("click", prevSong);

audio.addEventListener("timeupdate", () => {
  const duration = audio.duration || 0;
  const current = audio.currentTime || 0;

  if (duration > 0) {
    const progressPercent = (current / duration) * 100;
    seekBar.value = progressPercent;
    seekBar.style.background = `linear-gradient(to right, var(--text-highlight) ${progressPercent}%, #535353 ${progressPercent}%)`;
  }

  currentTimeEl.textContent = formatTime(current);
  totalTimeEl.textContent = formatTime(duration);
});

audio.addEventListener("ended", nextSong);

seekBar.addEventListener("input", (event) => {
  const duration = audio.duration || 0;
  if (duration > 0) {
    audio.currentTime = (Number(event.target.value) / 100) * duration;
  }
});

volumeBar.addEventListener("input", (event) => {
  const vol = Number(event.target.value) / 100;
  audio.volume = vol;
  if (vol > 0) volumeBar.dataset.storedVolume = String(event.target.value);
  volumeBar.style.background = `linear-gradient(to right, var(--text-highlight) ${event.target.value}%, #535353 ${event.target.value}%)`;

  if (vol === 0) {
    volumeIcon.className = "ri-volume-mute-line";
  } else if (vol < 0.5) {
    volumeIcon.className = "ri-volume-down-line";
  } else {
    volumeIcon.className = "ri-volume-up-line";
  }
});

audio.volume = 1;
volumeBar.dataset.storedVolume = "100";
volumeBar.style.background = `linear-gradient(to right, var(--text-highlight) 100%, #535353 100%)`;

mainScroll.addEventListener("scroll", () => {
  topbar.classList.toggle("topbar--elevated", mainScroll.scrollTop > 8);
});

menuToggle.addEventListener("click", (e) => {
  e.stopPropagation();
  toggleMobileMenu();
});

navOverlay.addEventListener("click", closeMobileMenu);

window.addEventListener("resize", () => {
  if (window.innerWidth > 900) closeMobileMenu();
});

document.addEventListener("keydown", (e) => {
  if (e.code === "Escape") {
    closeMobileMenu();
    return;
  }

  if (isTypingContext(document.activeElement)) return;

  if (e.code === "MediaPlayPause") {
    e.preventDefault();
    togglePlay();
    return;
  }
  if (e.code === "MediaTrackNext") {
    e.preventDefault();
    nextSong();
    return;
  }
  if (e.code === "MediaTrackPrevious") {
    e.preventDefault();
    prevSong();
    return;
  }

  switch (e.code) {
    case "Space":
      e.preventDefault();
      togglePlay();
      break;
    case "KeyK":
      e.preventDefault();
      togglePlay();
      break;
    case "ArrowLeft":
      e.preventDefault();
      if (e.shiftKey) {
        audio.currentTime = Math.max(0, audio.currentTime - 5);
      } else {
        prevSong();
      }
      break;
    case "ArrowRight":
      e.preventDefault();
      if (e.shiftKey) {
        const d = audio.duration || 0;
        audio.currentTime = Math.min(d, audio.currentTime + 5);
      } else {
        nextSong();
      }
      break;
    case "ArrowUp":
      e.preventDefault();
      volumeBar.value = String(Math.min(100, Number(volumeBar.value) + 5));
      volumeBar.dispatchEvent(new Event("input", { bubbles: true }));
      break;
    case "ArrowDown":
      e.preventDefault();
      volumeBar.value = String(Math.max(0, Number(volumeBar.value) - 5));
      volumeBar.dispatchEvent(new Event("input", { bubbles: true }));
      break;
    case "KeyM":
      e.preventDefault();
      if (Number(volumeBar.value) > 0) {
        volumeBar.dataset.beforeMute = volumeBar.value;
        volumeBar.value = "0";
      } else {
        volumeBar.value = volumeBar.dataset.beforeMute || volumeBar.dataset.storedVolume || "80";
      }
      volumeBar.dispatchEvent(new Event("input", { bubbles: true }));
      break;
    default:
      break;
  }
});

// Init
renderTracks();
loadSong(0);
