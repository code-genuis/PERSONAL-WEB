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
const thumbnailContainer = document.getElementById("thumbnailContainer");
const closeModalBtn = document.getElementById("closeModalBtn");
const overlayBackground = document.getElementById("overlayBackground");
const videoModal = document.getElementById("videoModal");
const controlButton = document.getElementById("controlButton");
const video = document.getElementById("myVideo");

// Set initial video volume to 40%
video.volume = 0.4;

// Open the modal with GSAP animation when the thumbnail is clicked
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

// Close the modal
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
      video.pause(); // Pause video when closing the modal
      controlButton.textContent = "Play"; // Reset button text to Play
    },
  });
}

// Play or pause the video on button click
controlButton.addEventListener("click", () => {
  if (video.paused) {
    video.play();
    controlButton.textContent = "Pause"; // Change button text to Pause
  } else {
    video.pause();
    controlButton.textContent = "Play"; // Change button text to Play
  }
});

// Update the button state when the video is playing
video.addEventListener("play", () => {
  controlButton.textContent = "Pause";
});

// Update the button state when the video is paused
video.addEventListener("pause", () => {
  controlButton.textContent = "Play";
});

// Ensure the button text resets when the video ends
video.addEventListener("ended", () => {
  controlButton.textContent = "Play";
});
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
