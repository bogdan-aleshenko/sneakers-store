import { shopingCart } from "./shoping.js";

const forms = document.querySelectorAll(".popup__form");
const openButton = document.querySelector(".login");
const closeButton = document.querySelector(".popup__close");
const fild = document.querySelector(".popup__fild");
const switchButtons = document.querySelectorAll(".form__switch a");
const buttonSendReq = document.querySelector(".popup__form.reg button");
const buttonSendLog = document.querySelector(".popup__form.login button");
const shopingImage = document.querySelector(".shoping_cart-image");
const loginImage = document.querySelector(".element__acc.login");
const logoutImage = document.querySelector(".element__acc.logout");

function openOrCloseForm() {
  const popup = document.querySelector(".popup");

  popup.classList.toggle("_open");
}

switchButtons.forEach((button) => {
  button.addEventListener("click", (e) => {
    e.preventDefault();

    forms.forEach((form, index) => {
      form.classList.toggle("_active");
    });
  });
});

openButton.addEventListener("click", openOrCloseForm);
closeButton.addEventListener("click", openOrCloseForm);
fild.addEventListener("click", openOrCloseForm);

const validateEmail = (email) => {
  if (email.value === "") {
    viewErrorMessage("Заповніть поле email.");
    email.classList.add("_error");
    return false;
  }

  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.value)) {
    viewErrorMessage("Не коректно введений email.");
    email.classList.add("_error");
    return false;
  }

  return true;
};
const validatePassword = (password) => {
  if (password.value.length < 8) {
    viewErrorMessage("Маленька довжина паролю.");
    password.classList.add("_error");
    return false;
  }

  if (/[!@#$%^&*(),.?":{}|<>]/.test(password.value)) {
    viewErrorMessage("Не коректно введений пароль.");
    password.classList.add("_error");
    return false;
  }

  if (!/[A-ZА-ЯіІїЇ]/.test(password.value.charAt(0))) {
    viewErrorMessage("Перша літера паролю маленька.");
    password.classList.add("_error");
    return false;
  }

  return true;
};
function validateRepPassword(repeatPassword, password) {
  if (repeatPassword.value.length < 8) {
    viewErrorMessage("Маленька довжина повторного паролю.");
    repeatPassword.classList.add("_error");
    return false;
  }

  if (/[!@#$%^&*(),.?":{}|<>]/.test(repeatPassword.value)) {
    viewErrorMessage("Не коректно введений повторний пароль.");
    repeatPassword.classList.add("_error");
    return false;
  }

  if (!/[A-ZА-ЯіІїЇ]/.test(repeatPassword.value.charAt(0))) {
    viewErrorMessage("Перша літера повторного паролю маленька.");
    repeatPassword.classList.add("_error");
    return false;
  }

  if (password.value !== repeatPassword.value) {
    viewErrorMessage("Паролі не співпадають.");
    repeatPassword.classList.add("_error");
    return false;
  }

  return true;
}
buttonSendReq.addEventListener("click", async (event) => {
  event.preventDefault();
  closeErrorMessage();
  resetInput();
  const email = document.querySelector(".popup__form.reg input[name='login']");
  const password = document.querySelector(
    ".popup__form.reg input[name='pass']"
  );
  const repeatPassword = document.querySelector(
    ".popup__form.reg input[name='rep_pass']"
  );
  const error =
    validateEmail(email) &&
    validatePassword(password) &&
    validateRepPassword(repeatPassword, password);

  if (error) {
    const dataUser = {
      email: email.value,
      password: password.value,
      repeatPassword: repeatPassword.value,
    };

    const requestOptions = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(dataUser),
    };
    viewErrorMessage("Реєстрація...");

    await fetch("../php/reg_user.php", requestOptions)
      .then((response) => response.json())
      .then((data) => {
        visibleShopping();
        localStorage.setItem("userId", data.id);
        viewErrorMessage("Ви успішно зареєстровані.");
        shopingCart();
        switchImage();
      })
      .catch((error) => {
        console.error("Помилка:", error);
        viewErrorMessage("Помилка при реєстрації.");
      });
  }
});
buttonSendLog.addEventListener("click", async (event) => {
  event.preventDefault();
  closeErrorMessage();
  resetInput();
  const email = document.querySelector(
    ".popup__form.login input[name='login']"
  );
  const password = document.querySelector(
    ".popup__form.login input[name='pass']"
  );
  const error = validateEmail(email) && validatePassword(password);

  if (error) {
    const dataUser = {
      email: email.value,
      password: password.value,
    };
    const requestOptions = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(dataUser),
    };
    viewErrorMessage("Вхід до акаунту...");

    await fetch("../php/log_user.php", requestOptions)
      .then((response) => response.json())
      .then((data) => {
        if (data.success) {
          visibleShopping();
          localStorage.setItem("userId", data.id);
          viewErrorMessage("Ви успішно увійшли до кабінету.");
          switchImage();
          shopingCart();
          openOrCloseForm();
        } else {
          viewErrorMessage("Помилка при вході.");
        }
      })
      .catch((error) => {
        console.error("Помилка:", error);
        viewErrorMessage("Помилка при вході.");
      });
  }
});
function viewErrorMessage(message) {
  const messageField = document.querySelector(".form__message");
  messageField.classList.add("_active");
  messageField.textContent = message;
}
function closeErrorMessage() {
  document.querySelector(".form__message").classList.remove("_active");
}
function resetInput() {
  const input = document.querySelectorAll(".popup__form input");
  input.forEach((e) => {
    e.classList.remove("_error");
  });
}
function visibleShopping() {
  shopingImage.innerHTML = `
  <svg
            width="31"
            height="30"
            viewBox="0 0 31 30"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            class="shoping"
          >
            <path
              fill-rule="evenodd"
              clip-rule="evenodd"
              d="M26.554 10.1251H28.6249C28.8493 10.1243 29.0708 10.1754 29.2722 10.2744C29.4736 10.3734 29.6493 10.5176 29.7857 10.6958C29.9221 10.874 30.0155 11.0814 30.0585 11.3016C30.1015 11.5219 30.093 11.7491 30.0336 11.9655L25.9517 26.9324C25.6046 28.2011 24.4467 29.0834 23.1371 29.0834H7.86402C7.22452 29.0824 6.60298 28.8718 6.09462 28.4838C5.58626 28.0958 5.21912 27.5519 5.04943 26.9353L0.967558 11.9669C0.908889 11.7506 0.900827 11.5237 0.943997 11.3037C0.987168 11.0838 1.08041 10.8767 1.2165 10.6986C1.35258 10.5205 1.52786 10.3761 1.72874 10.2766C1.92962 10.1772 2.1507 10.1253 2.37485 10.1251H4.44568L9.85902 0.651733L12.3921 2.0984L7.80422 10.1251H23.1955L18.609 2.0984L21.1407 0.651733L26.554 10.1251ZM7.86402 26.1667H23.1357L26.7144 13.0417H4.28527L7.86402 26.1667ZM14.0417 15.9584H11.125V23.25H14.0417V15.9584ZM19.875 15.9584H16.9583V23.25H19.875V15.9584Z"
              class="element__color"
              fill="white"
            />
          </svg>
  `;
}
if (localStorage.getItem("userId")) {
  visibleShopping();
  shopingCart();
}

function switchImage() {
  loginImage.classList.toggle("_active");
  logoutImage.classList.toggle("_active");
}

const logoutButton = document.querySelector(".element__acc.logout");

logoutButton.addEventListener("click", () => {
  const addGoodsButton = document.querySelector(".social__add");
  addGoodsButton.classList.remove("_active");
  localStorage.removeItem("userId");
  shopingImage.innerHTML = "";
  switchImage();
});

if (localStorage.getItem("userId")) {
  switchImage();
}
