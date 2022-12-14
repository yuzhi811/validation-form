let amountValue = 0;
let amountValue0 = 0;
let amountValue1 = 0;
let amountValue2 = 0;
let amountValue3 = 0;
let amountValue4 = 0;
let total = 0;
let subtotalValue0 = 0;
let subtotalValue1 = 0;
let subtotalValue2 = 0;
let subtotalValue3 = 0;
let subtotalValue4 = 0;
let cartObject = {};
const inputValue = document.querySelector("input");

function validateForm(e) {
  e.preventDefault();
  var valid = true;
  //a) Text (min and max length)
  if (form.name.value.length > 20) {
    document.getElementById("nameError").textContent =
      "*Please enter a valid text for your name";
    valid = false;
  } else {
    document.getElementById("nameError").textContent = "";
  }
  //• Number
  if (form.age.value.length == 0) {
    console.log("form.age.value");
    valid = true;
  } else if (form.age.value < 1 || form.age.value > 100) {
    document.getElementById("numError").textContent =
      "*Please enter a vaild number for your age ";
    valid = false;
  } else {
    document.getElementById("numError").textContent = "";
  }
  //c) Date ( verify input to be after specific date
  if (form.sdate.value > form.edate.value) {
    document.getElementById("dateError").textContent =
      "*Please enter a vaild date";
    valid = false;
  } else {
    document.getElementById("dateError").textContent = "";
  }
  //d) A List that allows editing input and single selection (Required)
  if (form.time.value == "") {
    document.getElementById("timeError").textContent =
      "*Please check at least one item";
    valid = false;
  } else {
    document.getElementById("timeError").textContent = "";
  }
  //radio
  if (
    document.getElementById("ottawa").checked ||
    document.getElementById("gatinue").checked ||
    document.getElementById("others").checked
  ) {
    document.getElementById("radioError").textContent = "";
  } else {
    document.getElementById("radioError").textContent =
      "*Please check at least one item";
    valid = false;
  }
  //If the data is submitted successfully, it is stored on localstorage
  if (valid) {
    localStorage.setItem("name", form.name.value);
    localStorage.setItem("age", form.age.value);
    localStorage.setItem("sdate", form.sdate.value);
    localStorage.setItem("edate", form.edate.value);
    localStorage.setItem("time", form.time.value);
    localStorage.setItem("residence", form.residence.value);
    localStorage.setItem("cartObject", JSON.stringify(cartObject));
    window.open("summary.html");
  }
}
//Submit button
document.form.addEventListener("submit", validateForm);

//Reset function
function reset() {
  nameError.textContent = "";
  numError.textContent = "";
  radioError.textContent = "";
  timeError.textContent = "";
  inputValue.value = null;
  resetSubtotal();
  resetAmount();
}

function resetSubtotal() {
  const subtotal = document.querySelectorAll(".subZero");
  for (let i of subtotal) {
    i.textContent = "";
  }
}

function resetAmount() {
  const amount = document.querySelectorAll(".amtZero");
  for (let i of amount) {
    i.textContent = "";
  }
}
//reset button
document.form.addEventListener("reset", reset);

//JSON
const main = document.querySelector("main");
const section = document.querySelector("section");
let requestURL = "./data.json";
let request = new XMLHttpRequest();
request.open("GET", requestURL);
request.responseType = "text";
request.send();
request.onload = function () {
  if (request.readyState === XMLHttpRequest.DONE) {
    if (request.status === 200) {
      const myText = request.response;
      const myContent = JSON.parse(myText);
      myHeader(myContent);
      showBand(myContent);
    }
  }
};

//based on the json data create a new element
function myHeader(obj) {
  const createH1 = document.createElement("h2");
  createH1.textContent = obj["shoppingList"];
  main.appendChild(createH1);
}

function showBand(obj) {
  const items = obj["items"];

  for (let i = 0; i < items.length; i++) {
    const myArticle = document.createElement("article");
    myArticle.className = `art${i}`;
    const mypara0 = document.createElement("img");
    const myPara1 = document.createElement("p");
    const myPara2 = document.createElement("p");
    myPara2.className = `price${i}`;
    const myPara3 = document.createElement("p");
    const amount = document.createElement("p");
    amount.className = `amount${i}`;
    const subtotal = document.createElement("p");
    subtotal.className = `subtotal${i}`;

    mypara0.src = `${items[i].image}`;
    myPara1.textContent = items[i].name;
    myPara2.textContent = items[i].price;
    myPara3.textContent = items[i].category;
    myArticle.appendChild(mypara0);
    myArticle.appendChild(myPara1);
    myArticle.appendChild(myPara2);
    myArticle.appendChild(myPara3);
    myArticle.appendChild(amount);
    myArticle.appendChild(subtotal);
    section.appendChild(myArticle);

    //For the reset button that make subtotal & amount zero
    subtotal.classList.add("subZero");
    amount.classList.add("amtZero");

    //whenever users click images, the amount & subtotal & total will change
    mypara0.addEventListener("click", () => {
      //total amount
      total += items[i].price;
      console.log(total);
      form.totalBox.value = total;
      //if there is the className of the image, each amount and subtotal will add
      //and also append name & amount value to an object that I created for the summary page(localstorage)
      if (myArticle.classList.contains("art0")) {
        amountValue0 += 1;
        amount.textContent = amountValue0;
        cartObject["waffle"] = amountValue0;
        subtotalValue0 += items[0].price;
        subtotal.textContent = subtotalValue0;
      } else if (myArticle.classList.contains("art1")) {
        amountValue1 += 1;
        amount.textContent = amountValue1;
        cartObject["burritto"] = amountValue1;
        subtotalValue1 += items[1].price;
        subtotal.textContent = subtotalValue1;
      } else if (myArticle.classList.contains("art2")) {
        amountValue2 += 1;
        amount.textContent = amountValue2;
        cartObject["roll"] = amountValue2;
        subtotalValue2 += items[2].price;
        subtotal.textContent = subtotalValue2;
      } else if (myArticle.classList.contains("art3")) {
        amountValue3 += 1;
        amount.textContent = amountValue3;
        cartObject["oat milk"] = amountValue3;
        subtotalValue3 += items[3].price;
        subtotal.textContent = subtotalValue3;
      } else if (myArticle.classList.contains("art4")) {
        amountValue4 += 1;
        amount.textContent = amountValue4;
        cartObject["rice bowl"] = amountValue4;
        subtotalValue4 += items[4].price;
        subtotal.textContent = subtotalValue4;
      }
    });
  }
}

//CLASS
const top3 = document.querySelector(".top3");
//create elements for class
const createArtEle = document.createElement("article");
const createClassEle = document.createElement("div");
createClassEle.className = "top3Class";
//create class
class Restaurant {
  constructor(name, price, address, ratings) {
    this.name = name;
    this.price = price;
    this.address = address;
    this.ratings = ratings;
  }
  showInfo() {
    return (
      "Name: " +
      this.name +
      "<br/>" +
      "price: " +
      this.price +
      "<br/>" +
      "address: " +
      this.address +
      "<br/>" +
      "ratings: " +
      this.ratings +
      "<br/>" +
      "<br/>"
    );
  }
}

//Objects from class
const restuarant1 = new Restaurant(
  "The Green Door",
  "C$12 - C$29",
  "198 Main St, Ottawa, Ontario K1S 1C6 Canada",
  4.5
);
const restuarant2 = new Restaurant(
  "Gezellig",
  "C$19 - C$80",
  "337 Richmond Rd, Ottawa, Ontario K2A 0E7 Canada",
  4.5
);
const restuarant3 = new Restaurant(
  "Cumberland Pizza",
  "C$20 - C$40",
  "152 Nelson St, Ottawa, Ontario K1N 7R5 Canada",
  4.0
);

//Populate an array of objects and display it
//Create an array of objects
const top3Array = [restuarant1, restuarant2, restuarant3];

// using loop over the array and display the content
for (let top3 of top3Array) {
  createClassEle.innerHTML = createClassEle.innerHTML + top3.showInfo();
}
//Attach the content
createArtEle.appendChild(createClassEle);
top3.appendChild(createArtEle);

// form.name.addEventListener('blur', ()=>{
//   nameError.textContent = ""
// })
