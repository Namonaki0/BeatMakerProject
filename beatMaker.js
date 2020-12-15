class BeatMaker {
  constructor() {
    this.pads = document.querySelectorAll(".pad");
    this.playBtn = document.querySelector(".play");
    this.kickSound = document.querySelector(".kick-sound");
    this.snareSound = document.querySelector(".snare-sound");
    this.hihatSound = document.querySelector(".hihat-sound");
    this.tomSound = document.querySelector(".tom-sound");
    this.clapSound = document.querySelector(".clap-sound");
    this.crashSound = document.querySelector(".crash-sound");
    this.openhatSound = document.querySelector(".openhat-sound");
    this.percSound = document.querySelector(".perc-sound");
    this.miscSound = document.querySelector(".misc-sound");
    this.currentKick = "./allSounds/kick-classic.wav";
    this.currentSnare = "./allSounds/snare-acoustic01.wav";
    this.currentHihat = "./allSounds/hihat-acoustic01.wav";
    this.selects = document.querySelectorAll("select");
    this.muteBtn = document.querySelectorAll(".mute");
    this.tempoSlider = document.querySelector(".tempo-slider");
    this.isPlaying = null;
    this.index = 0;
    this.bpm = 100;
  }
  muteFunction(e) {
    const muteIndex = e.target.getAttribute("data-track");
    e.target.classList.toggle("active");

    if (e.target.classList.contains("active")) {
      switch (muteIndex) {
        case "0":
          this.kickSound.volume = 0;
          break;
        case "1":
          this.snareSound.volume = 0;
          break;
        case "2":
          this.hihatSound.volume = 0;
          break;
        case "3":
          this.tomSound.volume = 0;
          break;
        case "4":
          this.clapSound.volume = 0;
          break;
        case "5":
          this.crashSound.volume = 0;
          break;
        case "6":
          this.openhatSound.volume = 0;
          break;
        case "7":
          this.percSound.volume = 0;
          break;
        case "8":
          this.miscSound.volume = 0;
          break;
      }
    } else {
      switch (muteIndex) {
        case "0":
          this.kickSound.volume = 1;
          break;
        case "1":
          this.snareSound.volume = 1;
          break;
        case "2":
          this.hihatSound.volume = 1;
          break;
        case "3":
          this.tomSound.volume = 1;
          break;
        case "4":
          this.clapSound.volume = 1;
          break;
        case "5":
          this.crashSound.volume = 1;
          break;
        case "6":
          this.openhatSound.volume = 1;
          break;
        case "7":
          this.percSound.volume = 1;
          break;
        case "8":
          this.miscSound.volume = 1;
          break;
      }
    }
  }

  addEffect() {
    this.classList.toggle("active");
  }
  playBtnUpdate() {
    if (!this.isPlaying) {
      this.playBtn.innerText = "stop";
      this.playBtn.classList.add("active");
    } else {
      this.playBtn.innerText = "play";
      this.playBtn.classList.remove("active");
    }
  }
  repeat() {
    let step = this.index % 8;
    let padTracking = document.querySelectorAll(`.b${step}`);
    padTracking.forEach((pad) => {
      pad.style.animation = `playTrack 150ms ease-in alternate 2`;
      if (pad.classList.contains("active")) {
        if (pad.classList.contains("kick-pad")) {
          this.kickSound.currentTime = 0;
          this.kickSound.play();
        }
        if (pad.classList.contains("snare-pad")) {
          this.snareSound.currentTime = 0;
          this.snareSound.play();
        }
        if (pad.classList.contains("hihat-pad")) {
          this.hihatSound.currentTime = 0;
          this.hihatSound.play();
        }
        if (pad.classList.contains("tom-pad")) {
          this.tomSound.currentTime = 0;
          this.tomSound.play();
        }
        if (pad.classList.contains("clap-pad")) {
          this.clapSound.currentTime = 0;
          this.clapSound.play();
        }
        if (pad.classList.contains("crash-pad")) {
          this.crashSound.currentTime = 0;
          this.crashSound.play();
        }
        if (pad.classList.contains("openhat-pad")) {
          this.openhatSound.currentTime = 0;
          this.openhatSound.play();
        }
        if (pad.classList.contains("perc-pad")) {
          this.percSound.currentTime = 0;
          this.percSound.play();
        }
        if (pad.classList.contains("misc-pad")) {
          this.miscSound.currentTime = 0;
          this.miscSound.play();
        }
      }
    });

    this.index++;
    console.log(step, padTracking);
  }

  play() {
    let interval = (60 / this.bpm) * 1000;
    if (!this.isPlaying) {
      this.isPlaying = setInterval(() => {
        this.repeat();
      }, interval);
    } else {
      clearInterval(this.isPlaying);
      this.isPlaying = null;
      this.index = 0;
    }
  }
  changeSounds(e) {
    const target = e.target.name;
    const targetValue = e.target.value;
    switch (target) {
      case "kick-select":
        this.kickSound.src = targetValue;
        break;
      case "snare-select":
        this.snareSound.src = targetValue;
        break;
      case "hihat-select":
        this.hihatSound.src = targetValue;
        break;
      case "tom-select":
        this.tomSound.src = targetValue;
        break;
      case "clap-select":
        this.clapSound.src = targetValue;
        break;
      case "crash-select":
        this.crashSound.src = targetValue;
        break;
      case "openhat-select":
        this.openhatSound.src = targetValue;
        break;
      case "perc-select":
        this.percSound.src = targetValue;
        break;
      case "misc-select":
        this.miscSound.src = targetValue;
        break;
    }
    console.log(target);
  }
  changeBpm(e) {
    const tempoMeter = document.querySelector(".tempo-meter");
    this.bpm = e.target.value;
    tempoMeter.innerText = this.bpm;
  }
  updateBpm() {
    clearInterval(this.isPlaying);
    this.isPlaying = null;
    const playBtn = document.querySelector(".play");
    if (playBtn.classList.contains("active")) {
      this.play();
    }
  }
}

const beatMaker = new BeatMaker();

beatMaker.pads.forEach((pad) => {
  pad.addEventListener("click", beatMaker.addEffect);
  pad.addEventListener("animationend", function () {
    this.style.animation = "";
  });
});

beatMaker.playBtn.addEventListener("click", () => {
  beatMaker.playBtnUpdate();
  beatMaker.play();
});

beatMaker.muteBtn.forEach((mute) => {
  mute.addEventListener("click", function (e) {
    beatMaker.muteFunction(e);
  });
});

beatMaker.selects.forEach((select) => {
  select.addEventListener("change", function (e) {
    beatMaker.changeSounds(e);
  });
});

beatMaker.tempoSlider.addEventListener("input", function (e) {
  beatMaker.changeBpm(e);
});

beatMaker.tempoSlider.addEventListener("change", function (e) {
  beatMaker.updateBpm(e);
});
