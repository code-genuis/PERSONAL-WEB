function heart() {
  const heartContainers = document.querySelectorAll(".heart-container");

  heartContainers.forEach((container) => {
    const heartCheckbox = container.querySelector(".heartcheckbox");
    const heartCountElement = container.querySelector(".heart-count");
    const heartId = container.getAttribute("data-heart-id");

    const userId = prompt("Enter your username:") || "Guest";
    const userLikes = JSON.parse(localStorage.getItem(heartId)) || [];

    heartCountElement.textContent = userLikes.length;
    heartCheckbox.checked = userLikes.includes(userId);

    heartCheckbox.addEventListener("change", function () {
      if (this.checked) {
        userLikes.push(userId);
      } else {
        const index = userLikes.indexOf(userId);
        if (index > -1) {
          userLikes.splice(index, 1);
        }
      }

      heartCountElement.textContent = userLikes.length;
      localStorage.setItem(heartId, JSON.stringify(userLikes));
    });
  });
}

heart();
