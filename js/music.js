const audio = document.getElementById("audio");
const playPauseBtn = document.getElementById("playPause");
const volumeControl = document.getElementById("volumeControl");
const fileUpload = document.getElementById("fileUpload");
const prevBtn = document.getElementById("prev");
const nextBtn = document.getElementById("next");
const trackList = document.getElementById("trackList");

const progressBar = document.getElementById("progressBar");
const currentTimeDisplay = document.getElementById("currentTime");
const durationDisplay = document.getElementById("duration");

let isPlaying = false;
let currentTrack = 0;

// Predefined local tracks
let localTracks = [
  { name: "Forty Five Six Six Six ", src: "../music/45_6_6_6.mp3" },
  { name: "W", src: "../music/W.mp3" },
  { name: "Ashes", src: "../music/Ashes.mp3" },
  { name: "I Love You So", src: "../music/I Love You So.mp3" },
  { name: "Just the two of us", src: "../music/Just the Two of Us.mp3" },
  { name: "Katputli Ke Dhaage", src: "../music/Katputli Ke Dhaage.mp3" },
  { name: "Kinni Kinni", src: "../music/Kinni Kinni.mp3" },
  { name: "Let Her Go", src: "../music/Let Her Go.mp3" },
  { name: "My Girl", src: "../music/My Girl.mp3" },
  { name: "Mystery Girl", src: "../music/Mystery Girl.mp3" },
];

// User uploaded tracks
let userTracks = [];

// Combine local and user-uploaded tracks
let tracks = [...localTracks];

// Function to render track list
function renderTrackList() {
  trackList.innerHTML = "";
  tracks.forEach((track, index) => {
    const li = document.createElement("li");
    li.textContent = track.name || `Uploaded Track ${index + 1}`;
    li.addEventListener("click", () => playTrack(index));
    trackList.appendChild(li);
  });
}

// Play or pause functionality
playPauseBtn.addEventListener("click", () => {
  if (isPlaying) {
    audio.pause();
    playPauseBtn.textContent = "▶️ Play";
  } else {
    audio.play();
    playPauseBtn.textContent = "⏸️ Pause";
  }
  isPlaying = !isPlaying;
});

// Skip to the next track
nextBtn.addEventListener("click", () => {
  if (tracks.length > 0) {
    currentTrack = (currentTrack + 1) % tracks.length;
    playTrack(currentTrack);
  }
});

// Skip to the previous track
prevBtn.addEventListener("click", () => {
  if (tracks.length > 0) {
    currentTrack = (currentTrack - 1 + tracks.length) % tracks.length;
    playTrack(currentTrack);
  }
});

// Volume control
volumeControl.addEventListener("input", (e) => {
  audio.volume = e.target.value;
});

// Handle file upload
fileUpload.addEventListener("change", (e) => {
  const files = e.target.files;
  const uploadedTracks = Array.from(files).map((file) => ({
    name: file.name,
    src: URL.createObjectURL(file),
  }));
  userTracks.push(...uploadedTracks);
  tracks = [...localTracks, ...userTracks]; // Merge local and user tracks
  renderTrackList();
  if (tracks.length > 0 && !isPlaying) {
    playTrack(currentTrack);
  }
});

// Function to play a specific track
function playTrack(index) {
  currentTrack = index;
  audio.src = tracks[index].src;
  audio.play();
  playPauseBtn.textContent = "⏸️ Pause";
  isPlaying = true;

  // Reset progress bar for the new track
  progressBar.value = 0;
  currentTimeDisplay.textContent = "0:00";
}

// Update progress bar as the track plays
audio.addEventListener("timeupdate", () => {
  const progressPercent = (audio.currentTime / audio.duration) * 100;
  progressBar.value = progressPercent;

  // Update the current time display
  currentTimeDisplay.textContent = formatTime(audio.currentTime);

  // Update the duration display if available
  if (!isNaN(audio.duration)) {
    durationDisplay.textContent = formatTime(audio.duration);
  }
});

// Seek functionality when the user interacts with the progress bar
progressBar.addEventListener("input", (e) => {
  const seekTime = (e.target.value / 100) * audio.duration;
  audio.currentTime = seekTime;
});

// Format time in MM:SS format
function formatTime(seconds) {
  const minutes = Math.floor(seconds / 60);
  const secs = Math.floor(seconds % 60);
  return `${minutes}:${secs < 10 ? "0" : ""}${secs}`;
}

// Reset play/pause button on track end
audio.addEventListener("ended", () => {
  playPauseBtn.textContent = "▶️ Play";
  isPlaying = false;
});

// Initialize the track list on page load
renderTrackList();
