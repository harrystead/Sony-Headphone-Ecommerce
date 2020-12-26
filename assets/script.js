const toggleBtn = document.getElementById("navbar-toggler");
const navDiv = document.querySelector(".navbar-collapse");

toggleBtn.addEventListener("click", () => {
    navDiv.classList.toggle("showNav");
    if (toggleBtn.firstElementChild.className == "fas fa-bars fa-fw") {
      toggleBtn.firstElementChild.className = "fas fa-times fa-fw";
      document.body.style.overflow = "hidden";
    } else {
      toggleBtn.firstElementChild.className = "fas fa-bars fa-fw";
      document.body.style.overflow = "visible";
    }
  });

  // stopping animation & transition during window resizing
let resizeTimer;
window.addEventListener("resize", () => {
  document.body.classList.add("resize-animation-stopper");
  clearTimeout(resizeTimer);
  resizeTimer = setTimeout(() => {
    document.body.classList.remove("resize-animation-stopper");
  }, 400);
});

// navigation in small screen
const links = document.querySelectorAll(".nav-link");
links.forEach((link) => {
  link.addEventListener("click", () => {
    document.body.style.overflow = "visible";
    navDiv.classList.remove("showNav");
    toggleBtn.firstElementChild.className = "fas fa-bars fa-fw";
  });
});

// review slider
const prevBtn = document.querySelector(".prev-btn");
const nextBtn = document.querySelector(".next-btn");
let idCount = 0;
const reviewSlide = document.querySelectorAll(".review-item");
