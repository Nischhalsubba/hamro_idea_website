// new Glider(document.querySelector(".work"));

new Glider(document.querySelector(".work .card-slider"), {
  slidesToShow: 3,
  draggable: true,
  dots: ".dots",
  arrows: {
    prev: ".glider-prev",
    next: ".glider-next",
  },
});

new Glider(document.querySelector(".technology .card-slider"), {
  slidesToShow: 5,
  draggable: true,
  dots: ".dots",
  arrows: {
    prev: ".glider-prev",
    next: ".glider-next",
  },
});

new Glider(document.querySelector(".testimonial .card-slider"), {
  slidesToShow: 1,
  draggable: true,
  dots: ".dots",
  arrows: {
    prev: ".glider-prev",
    next: ".glider-next",
  },
});

// Hedear

document.addEventListener("DOMContentLoaded", function (event) {
  window.scroll(function () {
    if (this.scrollTop() > 1) {
      document.getElementByClassName("nav").classList.add("sticky");
    } else {
      document.getElementByClassName("nav").classList.remove("sticky");
    }
  });
});
