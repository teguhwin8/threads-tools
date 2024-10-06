let count = 0;

async function autoLikeAndFollow() {
  const likeButton = document.querySelector('svg[aria-label="Suka"]');
  if (likeButton) {
    likeButton
      .closest('div[role="button"]')
      .scrollIntoView({ behavior: "smooth", block: "center" });
    likeButton.closest('div[role="button"]').click();
    count++;

    const followDelay = Math.floor(Math.random() * (5000 - 2000 + 1)) + 2000;
    setTimeout(() => {
      clickFollowButton();
    }, followDelay);
  } else {
    window.scrollBy(0, window.innerHeight);
    setTimeout(autoLikeAndFollow, 2000);
    return;
  }

  const interval = Math.floor(Math.random() * (10000 - 3000 + 1)) + 3000;
  setTimeout(autoLikeAndFollow, interval);
}

function clickFollowButton() {
  const followButton = document.querySelector(
    'div[role="button"] svg[aria-label="Ikuti"]'
  );
  if (followButton) {
    followButton
      .closest("div")
      .scrollIntoView({ behavior: "smooth", block: "center" });
    followButton.closest("div").click();

    const confirmationDelay =
      Math.floor(Math.random() * (5000 - 2000 + 1)) + 2000;
    setTimeout(() => {
      clickFollowConfirmation();
    }, confirmationDelay);
  } else {
    window.scrollBy(0, window.innerHeight);
    setTimeout(clickFollowButton, 2000);
  }
}

function clickFollowConfirmation() {
  const followerCountElement = Array.from(
    document.querySelectorAll("span")
  ).find((span) => span.innerText.includes("pengikut"));

  if (followerCountElement) {
    let parentDiv = followerCountElement.parentElement;
    parentDiv = parentDiv.parentElement;

    const confirmButton = parentDiv.nextElementSibling;

    if (confirmButton && confirmButton.innerText.includes("Ikuti")) {
      confirmButton.click();
      const refreshDelay = Math.floor(Math.random() * (5000 - 3000 + 1)) + 3000;
      setTimeout(() => {
        location.reload();
      }, refreshDelay);
    } else {
      window.scrollBy(0, window.innerHeight);
      setTimeout(clickFollowConfirmation, 2000);
    }
  } else {
    window.scrollBy(0, window.innerHeight);
    setTimeout(clickFollowConfirmation, 2000);
  }
}

function refreshPage() {
  const refreshInterval =
    Math.floor(Math.random() * (4000000 - 3600000 + 1)) + 3600000;
  setTimeout(() => {
    location.reload();
  }, refreshInterval);
}

if (window.location.href.includes("https://www.threads.net/")) {
  autoLikeAndFollow();
  refreshPage();
}
