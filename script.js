document.addEventListener("DOMContentLoaded", function () {
  const gallery = document.getElementById('gallery');
  const images = gallery.querySelectorAll('img');
  const leftArrow = document.querySelector(".arrow.left");
  const rightArrow = document.querySelector(".arrow.right");

  const imageWidth = images[0].offsetWidth;
  const gap = parseInt(getComputedStyle(gallery).getPropertyValue('gap')) || 15;
  const scrollAmount = imageWidth + gap;

  // Scroll Function
  function scrollGallery(direction) {
    gallery.scrollBy({
      left: direction * scrollAmount,
      behavior: 'smooth'
    });
    setTimeout(updateArrows, 300); // update arrows after scroll
  }

  // Update Arrow Visibility
  function updateArrows() {
    const maxScrollLeft = gallery.scrollWidth - gallery.clientWidth;
    leftArrow.disabled = gallery.scrollLeft <= 0;
    rightArrow.disabled = gallery.scrollLeft >= maxScrollLeft - 5;
  }

  // Arrow click
  leftArrow.addEventListener("click", () => scrollGallery(-1));
  rightArrow.addEventListener("click", () => scrollGallery(1));

  // Keyboard navigation
  document.addEventListener("keydown", function (e) {
    if (e.key === "ArrowLeft") scrollGallery(-1);
    if (e.key === "ArrowRight") scrollGallery(1);
  });

  // Touch swipe support
  let touchStartX = 0;
  gallery.addEventListener("touchstart", function (e) {
    touchStartX = e.changedTouches[0].screenX;
  });

  gallery.addEventListener("touchend", function (e) {
    const touchEndX = e.changedTouches[0].screenX;
    const deltaX = touchEndX - touchStartX;
    if (deltaX > 50) scrollGallery(-1);
    else if (deltaX < -50) scrollGallery(1);
  });

  // Optional: Autoplay every 5 seconds
  // setInterval(() => scrollGallery(1), 5000);

  // Initial state
  updateArrows();
});
