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

showCurrentSlide(idCount);
function showCurrentSlide(id) {
  hideAllSlide();
  reviewSlide.forEach((item, idx) => {
    if (id == idx) {
      item.classList.add("activeSlide");
    }
  });
}

function hideAllSlide() {
  reviewSlide.forEach((item) => {
    item.classList.remove("activeSlide");
  });
}

prevBtn.addEventListener("click", () => {
  idCount--;
  if (idCount < 0) {
    idCount = reviewSlide.length - 1;
  }
  showCurrentSlide(idCount);
});

nextBtn.addEventListener("click", () => {
  idCount++;
  if (idCount == reviewSlide.length) {
    idCount = 0;
  }
  showCurrentSlide(idCount);
});

//-------------------------------------------------------------------\\

document.addEventListener("DOMContentLoaded", () => {
    localStorage.clear();
  });

let cartNumber = parseInt(document.querySelector(".cart-items").innerText);
let clickCounter = 0;
let blackColorCounter = 0;
let whiteColorCounter = 0;

//function for buttons adding to basket.
let button = document.querySelectorAll(".add-btn");
button.forEach((btn) => {
  btn.addEventListener("click", (event) => {
    console.log(event.target);

    $(".product-item").css("visibility", "hidden");
    $(".product").css("background-color", "rgba(0, 0, 0, 0.8)");

    clickCounter++;
    console.log(clickCounter);
    cartNumber = clickCounter;

    const black = document.getElementById("black").id;
    const white = document.getElementById("white").id;
    console.log(black);
    console.log(white);

    var selected = event.target.id;
    console.log(selected);

    if (selected === black) {
      blackColorCounter++;
      console.log("black: ", blackColorCounter);
    }

    if (selected === white) {
      whiteColorCounter++;
      console.log("white: ", whiteColorCounter);
    }

    if (selected === white || selected === black) {
      document.querySelector(".cart-items").innerText = cartNumber;
      $(".styled-table").css("visibility", "visible");

      const identify = event.target.parentElement;
      console.log(identify);

      const image = identify.children[0].src;
      console.log(image);
      localStorage.setItem("product image: ", image);
      const title = identify.children[1].children[0].innerText;
      localStorage.setItem("product image: ", image);
      const description = identify.children[1].children[2].innerText;
      localStorage.setItem("product description: ", description);

      const price = identify.children[1].children[3].innerText;
      const priceExact = price.substr(6, 9);
      console.log(priceExact);
      localStorage.setItem("product price: ", price);

      const cartRowContents = `
      <td><img id="item-image" src="${image}"></img></td>
      <td id="item-description">${description}</td>
      <td id="item-price">${priceExact}</td>
      <td><input class="item-quantity-input" id="item-quantity" type="number" value="1"></td>
      <td class="subtotal-class" id="subtotal-one">${priceExact}</td>
      <td><button id="remove-item" class="item-remove">remove</button></td>`;

      const tableOne = document.getElementById("table-row-one");
      console.log(tableOne);

      const cartRow = document.createElement("tr");
      cartRow.setAttribute("id", "cart-row");
      cartRow.classList.add("cart-row");
      cartRow.innerHTML = cartRowContents;
      tableOne.prepend(cartRow);

      //add event listeners to change and remove buttons

      let change = document.querySelectorAll(".item-quantity-input");
      change.forEach((btn) => {
        btn.addEventListener("change", quantityChanged);
      });

      const secondChange = document.getElementById("item-quantity-two");
      secondChange.addEventListener("change", quantityChanged);

      let removeItemsBasket = document.querySelectorAll(".item-remove");
      removeItemsBasket.forEach((buttons) => {
        buttons.addEventListener("click", removeItem);
      });

      //if both black and white already in basket don't allow to be added to cart again.
      if (selected === black && blackColorCounter > 1 || selected === white && whiteColorCounter > 1) {
        console.log("hello");
        cartRow.innerHTML = "";
        cartRow.remove();
        alert("This item is already in your basket.");
      }

      if (blackColorCounter == 1 && whiteColorCounter == 1) {
        const priceTwo = document.getElementById("grand-total");
        priceTwo.innerText = "Total: £775";
      }
    }
  });
});

//---------------------------------------------------------\\

const quantityChanged = (event) => {
    console.log("Hello");
  
    //input for headphones
    const headphoneValue = event.target.value;
    const convertHeadphoneValue = parseInt(headphoneValue);
    console.log(convertHeadphoneValue);
  
    let headphoneSubtotal = event.target.parentElement.nextElementSibling;
    console.log(headphoneSubtotal);
  
    let headphoneTotal = convertHeadphoneValue * 350;
    headphoneSubtotal.innerText = "£" + headphoneTotal;
    console.log(headphoneTotal);
  
    //input for insurance
    const quantityInsurance = document.getElementById("item-quantity-two").value;
    const convertInsurance = parseInt(quantityInsurance);
    console.log(convertInsurance);
  
    const multiplyInsurance = convertInsurance * 75;
    const insuranceSubtotal = document.getElementById("subtotal-two");
    insuranceSubtotal.innerText = "£" + multiplyInsurance;
  
    let subtotalAdd = document.getElementsByClassName("subtotal-class");
      console.log(subtotalAdd);
      let array = [];
    
      for (var i = 0; i < subtotalAdd.length; i++) {
        const subtotalAddOne = subtotalAdd[i].innerText;
        const price = parseFloat(subtotalAddOne.replace("£", ""));
        array.push(price);
        console.log(array);
    
        let totalOne = array[0];
        console.log(totalOne)
        let totalTwo = array[1];
        console.log(totalTwo)
        let totalThree = array[2];
        console.log(totalThree)
    
        if (array.length === 3) {
          let maxTotal = totalOne + totalTwo + totalThree;
          document.getElementById("grand-total").innerText =
            "Total: " + "£" + maxTotal;
        }
    
        if (array.length === 2) {
          let maxTotal = totalOne + totalTwo;
          document.getElementById("grand-total").innerText =
            "Total: " + "£" + maxTotal;
        }
    
        if (array.length === 1) {
          let maxTotal = totalOne;
          document.getElementById("grand-total").innerText =
            "Total: " + "£" + maxTotal;
        }
    
      }
  }

  //remove button function for cart
const removeItem = (event) => {
    const selectedCartRow = event.target.parentElement.parentElement;
    console.log(selectedCartRow);
    selectedCartRow.remove();
    console.log(selectedCartRow);
    clickCounter--;
    blackColorCounter--;
    whiteColorCounter--;
    console.log(blackColorCounter);
    console.log(whiteColorCounter);
  
    if (whiteColorCounter === -1 || blackColorCounter === -1) {
      blackColorCounter = 0;
      whiteColorCounter = 0;
      console.log(blackColorCounter);
    }


let subtotalAdd = document.getElementsByClassName("subtotal-class");
    console.log(subtotalAdd);
    let array = [];
  
    for (var i = 0; i < subtotalAdd.length; i++) {
      const subtotalAddOne = subtotalAdd[i].innerText;
      const price = parseFloat(subtotalAddOne.replace("£", ""));
      array.push(price);
      console.log(array);
  
      let totalOne = array[0];
      console.log(totalOne)
      let totalTwo = array[1];
      console.log(totalTwo)
      let totalThree = array[2];
      console.log(totalThree)
  
      if (array.length === 3) {
        let maxTotal = totalOne + totalTwo + totalThree;
        document.getElementById("grand-total").innerText =
          "Total: " + "£" + maxTotal;
      }
  
      if (array.length === 2) {
        let maxTotal = totalOne + totalTwo;
        document.getElementById("grand-total").innerText =
          "Total: " + "£" + maxTotal;
      }
  
      if (array.length === 1) {
        let maxTotal = totalOne;
        document.getElementById("grand-total").innerText =
          "Total: " + "£" + maxTotal;
      }
    }
};


//---------------------------------------------------------\\

$("#remove-btn").on("click", () => {
    $(".styled-table").css("visibility", "hidden");
    $(".product-item").css("visibility", "visible");
    $(".product").css("background-color", "rgba(0, 0, 0, 0.0)");
  });
  
  $("#continue-btn").on("click", () => {
    $(".styled-table").css("visibility", "hidden");
    $(".product-item").css("visibility", "visible");
    $(".product").css("background-color", "rgba(0, 0, 0, 0.0)");
  });
  
  $("#cart-plus").on("click", () => {
    const cartRow = document.getElementById("cart-row");
    console.log(cartRow);
  
    if (cartRow) {
      $(".styled-table").css("visibility", "visible");
      $(".product-item").css("visibility", "hidden");
      $(".product").css("background-color", "rgba(0, 0, 0, 0.8)");
  
      $("html,body").animate(
        {
          scrollTop: $(".product").offset().top,
        },
        500
      );
    } else {
      alert("Shopping cart is empty.");
    }
  });
  
  //-----------------------------------------------------\\
  

  
