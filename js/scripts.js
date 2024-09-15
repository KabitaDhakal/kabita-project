// This JavaScript file provides basic navigation functionality.Students will expand this file to include more complex logic for the calendar and music player.
document.addEventListener("DOMContentLoaded", function () {
  const homeLink = document.getElementById("home-link");
  const calendarLink = document.getElementById("calendar-link");
  const musicLink = document.getElementById("music-link");

  const homeSection = document.getElementById("home");
  const calendarSection = document.getElementById("calendar-page");
  const musicSection = document.getElementById("music");
  homeLink.classList.add("text-primary");

  homeLink.addEventListener("click", function () {
    homeLink.classList.add("text-primary");
    calendarLink.classList.remove("text-primary");
    musicLink.classList.remove("text-primary");

    homeSection.style.display = "block";
    calendarSection.style.display = "none";
    musicSection.style.display = "none";
  });

  calendarLink.addEventListener("click", function () {
    homeLink.classList.remove("text-primary");
    calendarLink.classList.add("text-primary");
    musicLink.classList.remove("text-primary");

    homeSection.style.display = "none";
    calendarSection.style.display = "block";
    musicSection.style.display = "none";
  });

  musicLink.addEventListener("click", function () {
    homeLink.classList.remove("text-primary");
    calendarLink.classList.remove("text-primary");
    musicLink.classList.add("text-primary");

    homeSection.style.display = "none";
    calendarSection.style.display = "none";
    musicSection.style.display = "block";
  });
});
