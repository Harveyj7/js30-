const player = document.querySelector(".player");
const video = player.querySelector(".viewer");
const progress = player.querySelector(".progress");
const progressBar = player.querySelector(".progress__filled");
const toggle = player.querySelector(".toggle");
const skipButtons = player.querySelectorAll("[data-skip]");
const ranges = player.querySelectorAll(".player__slider");

function togglePlay() {
  if (video.paused) {
    video.play();
  } else {
    video.pause();
  }
}
function updateButton() {
  //   console.log(updateButton);
  let icon;
  if (this.paused) {
    icon = "►";
  } else {
    icon = "❚❚";
  }
  toggle.textContent = icon;
}
//   if (toggle.innerHTML === "&#10074&#10074") {
//     toggle.innerHTML = "&#9658";
//     // console.log("&#10074&#10074");
//   } else {
//     toggle.innerHTML === "&#10074&#10074";
//   }

function skip() {
  video.currentTime += parseFloat(this.dataset.skip);
}

function handleRangeUpdate() {
  console.log(this.value);
  //   console.log(this.name);
  video[this.name] = this.value;
}

function progresshandler() {
  const percent = (video.currentTime / video.duration) * 100;
  progressBar.style.flexBasis = `${percent}%`;
}

function scrub(e) {
  const scrubTime = (e.offsetX / progress.offsetWidth) * video.duration;
  video.currentTime = scrubTime;
  console.log(scrubTime);
}

toggle.addEventListener("click", togglePlay);
video.addEventListener("click", togglePlay);
video.addEventListener("play", updateButton);
video.addEventListener("pause", updateButton);
video.addEventListener("timeupdate", progresshandler);
// console.log(skipButtons);
skipButtons.forEach((button) => button.addEventListener("click", skip));
ranges.forEach((slider) =>
  slider.addEventListener("change", handleRangeUpdate)
);
ranges.forEach((slider) =>
  slider.addEventListener("mousemove", handleRangeUpdate)
);
let mousedown = false;
progress.addEventListener("click", scrub);
progress.addEventListener("mousemove", (e) => mousedown && scrub(e));
progress.addEventListener("mousedown", () => (mousedown = true));
progress.addEventListener("mouseup", () => (mousedown = false));
