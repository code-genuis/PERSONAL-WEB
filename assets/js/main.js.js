// ------------- LORD-ICON -------------
function lord_icon() {
  const icon = document.getElementById("my-icon");
  let isActive = false;

  icon.addEventListener("mouseover", () => {
    if (!isActive) {
      icon.setAttribute("colors", "primary:#6D9985");
    }
  });

  icon.addEventListener("mouseout", () => {
    if (!isActive) {
      icon.setAttribute("colors", "primary:#ffffff");
    }
  });

  icon.addEventListener("click", () => {
    isActive = !isActive;

    if (isActive) {
      icon.setAttribute("colors", "primary:#6D9985");
    } else {
      icon.setAttribute("colors", "primary:#ffffff");
    }
  });
}
lord_icon();

// ------------- HEADER PROFILE -------------
function headerProfile() {
  const header_profile = document.querySelector(".header-profile");
  const profileDropdown = document.querySelector(".dropdown-profile");

  header_profile.addEventListener("click", () => {
    if (profileDropdown.style.display === "block") {
      profileDropdown.style.display = "none";
    } else {
      profileDropdown.style.display = "block";
    }
  });
}
headerProfile();

// ------------- LEFT MENU BUTTON -------------
function leftMenuButton() {
  const leftbuttonclick = document.querySelector(".left-bar-button");
  const leftMenuBar = document.querySelector(".left-menu-bar");

  const buttonClick = () => {
    leftbuttonclick.classList.toggle("buttonClick");

    if (leftbuttonclick.classList.contains("buttonClick")) {
      gsap.to(leftbuttonclick, {
        duration: 0.5,
        backgroundColor: "var(--hover-color)",
        ease: "power2.inOut",
      });

      gsap.to(leftMenuBar, {
        duration: 0.5,
        width: "15%",
        ease: "power2.inOut",
      });
    } else {
      gsap.to(leftbuttonclick, {
        duration: 0.5,
        backgroundColor: "var(--body-color)",
        ease: "power2.inOut",
      });

      gsap.to(leftMenuBar, {
        duration: 0.5,
        width: "80px",
        ease: "power2.inOut",
      });
    }
  };

  leftbuttonclick.addEventListener("click", buttonClick);
}
leftMenuButton();

// ------------- INFINITE SECTION -------------
function infiniteSection() {
  let direction = 1;

  const marqueeAnimation = gsap.timeline({
    repeat: -1,
    defaults: { duration: 2, ease: "none" },
  });

  marqueeAnimation.to(".marquee", {
    xPercent: -100,
  });

  window.addEventListener("wheel", function (dets) {
    if (dets.deltaY > 0 && direction !== 1) {
      direction = 1;
      marqueeAnimation.timeScale(1);
      gsap.to(".marquee img", {
        rotate: 180,
      });
    } else if (dets.deltaY < 0 && direction !== -1) {
      direction = -1;
      marqueeAnimation.timeScale(-1);
      gsap.to(".marquee img", {
        rotate: 0,
      });
    }
  });
}
infiniteSection();

// ------------- CONTROL VIDEO -------------
function controlVideo() {
  const thumbnailContainer = document.getElementById("thumbnailContainer");
  const closeModalBtn = document.getElementById("closeModalBtn");
  const overlayBackground = document.getElementById("overlayBackground");
  const videoModal = document.getElementById("videoModal");
  const controlButton = document.getElementById("controlButton");
  const video = document.getElementById("myVideo");

  video.volume = 0.4;

  thumbnailContainer.addEventListener("click", () => {
    gsap.to(videoModal, {
      display: "block",
      scale: 1,
      opacity: 1,
      duration: 0.8,
      ease: "power3.out",
    });
    overlayBackground.style.display = "block";
  });

  closeModalBtn.addEventListener("click", closeModal);
  overlayBackground.addEventListener("click", closeModal);

  function closeModal() {
    gsap.to(videoModal, {
      scale: 0.5,
      opacity: 0,
      duration: 0.8,
      ease: "power3.in",
      onComplete: () => {
        videoModal.style.display = "none";
        overlayBackground.style.display = "none";
        video.pause();
        controlButton.textContent = "Play";
      },
    });
  }

  controlButton.addEventListener("click", () => {
    if (video.paused) {
      video.play();
      controlButton.textContent = "Pause";
    } else {
      video.pause();
      controlButton.textContent = "Play";
    }
  });

  video.addEventListener("play", () => {
    controlButton.textContent = "Pause";
  });

  video.addEventListener("pause", () => {
    controlButton.textContent = "Play";
  });

  video.addEventListener("ended", () => {
    controlButton.textContent = "Play";
  });
}
controlVideo();

// ------------- ARTICLE CURSOR -------------
function articleVideo() {
  const openVideoPopup = (videoSrc) => {
    const popup = document.getElementById("videoPopup");
    const popupVideo = document.getElementById("popupVideo");

    popupVideo.querySelector("source").src = videoSrc;
    popupVideo.load();

    // popup.classList.toggle("no-scroll");
    gsap.to(popup, {
      display: "flex",
      opacity: 1,
      duration: 0.5,
      ease: "power2.out",
    });
  };

  const closePopup = () => {
    const popup = document.getElementById("videoPopup");
    gsap.to(popup, {
      opacity: 0,
      duration: 0.5,
      ease: "power2.in",
      onComplete: () => {
        popup.style.display = "none";
        document.getElementById("popupVideo").pause();
      },
    });
  };

  document.querySelectorAll(".clickable-video").forEach((video) => {
    video.addEventListener("click", function () {
      const videoSrc = this.querySelector("source").src;
      openVideoPopup(videoSrc);
    });
  });

  document.querySelector(".close-btn").addEventListener("click", closePopup);

  const popup = document.getElementById("videoPopup");
  popup.addEventListener("click", (e) => {
    if (e.target === popup) {
      closePopup();
    }
  });

  const popupVideo = document.getElementById("popupVideo");
  const playPauseBtn = document.getElementById("playPauseBtn");
  const volumeSlider = document.getElementById("volumeSlider");

  playPauseBtn.addEventListener("click", () => {
    if (popupVideo.paused) {
      popupVideo.play();
      playPauseBtn.textContent = "Pause";
    } else {
      popupVideo.pause();
      playPauseBtn.textContent = "Play";
    }
  });

  volumeSlider.addEventListener("input", (e) => {
    popupVideo.volume = e.target.value;
  });

  const maximizeBtn = document.getElementById("maximizeBtn");
  const customControls = document.querySelector(".custom-controls");
  const popupContent = document.querySelector(".popup-content");

  maximizeBtn.addEventListener("click", () => {
    if (!document.fullscreenElement) {
      popupContent.requestFullscreen().catch((err) => {
        alert(`Error attempting to enable full-screen mode: ${err.message}`);
      });

      customControls.style.marginLeft = "0";
      maximizeBtn.textContent = "Minimize";
    } else {

      document.exitFullscreen().catch((err) => {
        alert(`Error attempting to exit full-screen mode: ${err.message}`);
      });

      customControls.style.marginLeft = "60px";
      maximizeBtn.textContent = "Maximize";
    }
  });
}
articleVideo();

// ------------- HEART -------------
function heart() {
  const heartContainers = document.querySelectorAll(".heart-container");

  heartContainers.forEach((container) => {
    const heartCheckbox = container.querySelector(".heartcheckbox");
    const heartCountElement = container.querySelector(".heart-count");
    const heartId = container.getAttribute("data-heart-id");

    let likeCount = localStorage.getItem(heartId)
      ? parseInt(localStorage.getItem(heartId))
      : 0;

    heartCountElement.textContent = likeCount;
    heartCheckbox.checked = likeCount > 0;

    heartCheckbox.addEventListener("change", function () {
      if (this.checked) {
        likeCount += 1;
      } else {
        likeCount -= 1;
      }

      heartCountElement.textContent = likeCount;
      localStorage.setItem(heartId, likeCount);
    });
  });
}
heart();

// ------------- SAVE -------------
function save() {
  const saveContainers = document.querySelectorAll(".ui-bookmark");

  saveContainers.forEach((container) => {
    const saveCheckbox = container.querySelector(".savecheckbox");
    const saveCountElement = container.querySelector(".save-count");
    const savetId = container.getAttribute("data-save-id");

    let saveCount = localStorage.getItem(savetId)
      ? parseInt(localStorage.getItem(savetId))
      : 0;

    saveCountElement.textContent = saveCount;
    saveCheckbox.checked = saveCount > 0;

    saveCheckbox.addEventListener("change", function () {
      if (this.checked) {
        saveCount += 1;
      } else {
        saveCount -= 1;
      }

      saveCountElement.textContent = saveCount;
      localStorage.setItem(savetId, saveCount);
    });
  });
}
save();
