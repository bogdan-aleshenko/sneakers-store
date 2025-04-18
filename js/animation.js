const animItemsFirst = document.querySelectorAll("._anim-items._first");
const animItemsSecond = document.querySelectorAll("._anim-items._second");
const animItemsThird = document.querySelectorAll("._anim-items._third");

const wobatPreload = document.querySelector("._anim-wobat");
export const animDuration = 1000;
const animDurationWobat =
  parseFloat(
    window
      .getComputedStyle(wobatPreload, "::after")
      .getPropertyValue("transition-duration")
      .replace("s", "")
  ) * 1000;

// setTimeout(animStart, animDuration);
export function animStart() {
  wobatPreload.classList.add("_active");
  setTimeout(animOnLoadFirst, animDurationWobat);
}
function animOnLoadFirst() {
  animItemsFirst.forEach((item) => {
    item.classList.add("_active");
  });
  setTimeout(animOnLoadSecond, animDuration);
}
function animOnLoadSecond() {
  animItemsSecond.forEach((item) => {
    item.classList.add("_active");
  });
  setTimeout(animOnLoadThird, animDuration);
}
function animOnLoadThird() {
  animItemsThird.forEach((item) => {
    item.classList.add("_active");
  });
}
