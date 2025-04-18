export function shopingCart() {
  const buttonOpen = document.querySelector(".shoping");
  const buttonClose = document.querySelector(".shoping__close");
  const fildClose = document.querySelector(".shoping__fild");
  const buttonGoodsAdd = document.querySelector(".social__add");

  buttonGoodsAdd.classList.add("_active");
  updateShoppingCart();

  buttonOpen.addEventListener("click", openOrCloseForm);
  buttonClose.addEventListener("click", openOrCloseForm);
  fildClose.addEventListener("click", openOrCloseForm);
  buttonGoodsAdd.addEventListener("click", async (event) => {
    event.preventDefault();
    if (
      localStorage.getItem("userId") &&
      localStorage.getItem("activeSlider")
    ) {
      const dataReq = {
        idUser: localStorage.getItem("userId"),
        idGoods: localStorage.getItem("activeSlider"),
      };
      const requestOptions = {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(dataReq),
      };

      await fetch("../php/shopping_card_add.php", requestOptions)
        .then((response) => {
          return response.json();
        })
        .then((data) => {
          updateShoppingCart();
        })
        .catch((error) => {
          console.error("Помилка:", error);
        });
    } else {
      alert("Відсутній користувач або товар!");
    }
  });

  function openOrCloseForm() {
    const popup = document.querySelector(".popup-shoping");

    popup.classList.toggle("_open");
  }
  async function updateShoppingCart() {
    const dataReq = {
      idUser: localStorage.getItem("userId"),
    };
    const requestOptions = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(dataReq),
    };

    await fetch("../php/getting_goods_for_shopping_cart.php", requestOptions)
      .then((response) => {
        return response.json();
      })
      .then((data) => {
        const shopingItems = document.querySelector(".shoping__items");
        shopingItems.innerHTML = ``;
        if (data.length) {
          data.forEach((element) => {
            shopingItems.innerHTML += `
            <div class="items__item" >
            <img src="./img/product/${element.path}" alt="" />
            <div class="item__desc">
              <div class="desc__title">${element.name}</div>
              <div class="desc__subtitle">${element.desc_goods}</div>
              <div class="desc__price"><span>${element.price}</span>$</div>
            </div>
            <div class="item__remove remove__goods" id="${element.id}"></div>
          </div>
            `;
          });
        }

        removeGoods();
      })
      .catch((error) => {
        console.error("Помилка:", error);
      });
  }
  function removeGoods() {
    const buttonGoodsRemove = document.querySelectorAll(".remove__goods");
    buttonGoodsRemove.forEach((element) =>
      element.addEventListener("click", async () => {
        const dataReq = {
          idUser: localStorage.getItem("userId"),
          idGoods: element.id,
        };
        const requestOptions = {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(dataReq),
        };

        await fetch("../php/delete_item_on_shopping_cart.php", requestOptions)
          .then((response) => {
            return response.json();
          })
          .then((data) => {
            console.log(data);
            updateShoppingCart();
          })
          .catch((error) => {
            console.error("Помилка:", error);
          });
      })
    );
  }
}
