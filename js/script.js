import { animStart, animDuration } from "./animation.js";

const textsRating = [];
const colors = [];

function addSlide(src, color, rating, id) {
  const swiperWrapper = document.querySelector(".swiper-wrapper");
  const div = document.createElement("div");
  const img = document.createElement("img");

  div.classList.add("swiper-slide");

  img.id = id;
  img.src = `./img/product/${src}`;
  img.setAttribute("color", color);
  img.setAttribute("rating", rating);

  div.appendChild(img);

  swiperWrapper.appendChild(div);
}

(async () => {
  await fetch("../php/getting_goods.php")
    .then((response) => {
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
      return response.json();
    })
    .then((data) => {
      data.forEach((e) => {
        setTimeout(animStart, animDuration);
        textsRating.push(e["text_rating"]);
        addSlide(e["path"], e["color"], e["rating"], e["id"]);
      });
    })
    .catch((error) => {
      console.error("There has been a problem with fetch operation:", error);
    });

  const idSlide = document.querySelectorAll(".swiper-slide img");
  localStorage.setItem("activeSlider", idSlide[0].id);

  const slideColors = document.querySelectorAll("img[color]");
  slideColors.forEach((e) => {
    colors.push(e.getAttribute("color"));
  });
  rating(0);
})();

const swiper = new Swiper(".swiper", {
  autoplay: {
    delay: 10000,
    disableOnInteraction: false,
  },
  direction: "vertical",
  mousewheel: true,
  navigation: {
    nextEl: ".swiper-button-next",
    prevEl: ".swiper-button-prev",
  },
  speed: 1000,
  keyboard: {
    enabled: true,
  },
  on: {
    slideChange: function () {
      const idSlide = document.querySelectorAll(".swiper-slide img");

      localStorage.setItem("activeSlider", idSlide[this.activeIndex].id);

      if (document.querySelector(".popup._open")) {
        swiper.autoplay = false;
      } else {
        swiper.autoplay = true;
      }

      const blockForChangeColor = [
        document.querySelector(".wrapper"),
        document.querySelector(".popup__content"),
        document.querySelector(".shoping__button span"),
        document.querySelector(".shoping__content"),
      ];

      blockForChangeColor.forEach((e) => {
        e.style.backgroundColor = colors[this.activeIndex];
      });

      rating(this.activeIndex);
    },
  },
});

function rating(numberOfSlide) {
  const ratingText = document.querySelector(".rating__text");
  ratingText.textContent = textsRating[numberOfSlide];

  const slideRatings = document.querySelectorAll("img[rating]");
  const stars = document.querySelectorAll(".item__color");
  const ratings = [];
  let colorIndex = 1;

  slideRatings.forEach((e) => {
    ratings.push(e.getAttribute("rating"));
  });

  stars.forEach((e) => {
    e.style.fill = "#ffffff4b";
  });

  stars.forEach((e, i) => {
    if (i < ratings[numberOfSlide]) {
      e.style.fill = `rgba(248,225,110, 1)`;
    }
  });
  if (ratings[numberOfSlide] % 1 > 0) {
    colorIndex = colorIndex * (ratings[numberOfSlide] % 1);
    stars[
      Math.floor(ratings[numberOfSlide])
    ].style.fill = `rgba(248,225,110, ${colorIndex})`;
  }
}
