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