//get the data from localstorage
let username = localStorage.getItem("name");
let age = localStorage.getItem("age");
let sdate = localStorage.getItem("sdate");
let edate = localStorage.getItem("edate");
let time = localStorage.getItem("time");
let residence = localStorage.getItem("residence");
let shoppedItems = JSON.parse(localStorage.getItem("cartObject"));

const $ul = document.querySelector("ul");
const $ol = document.querySelector("ol");

// Created elements for the information of a form
const createLi01 = document.createElement("li");
const createLi02 = document.createElement("li");
const createLi03 = document.createElement("li");
const createLi04 = document.createElement("li");
const createLi05 = document.createElement("li");
const createLi07 = document.createElement("li");

//get the form data
createLi01.textContent = username;
createLi02.textContent = age;
createLi03.textContent = sdate;
createLi04.textContent = edate;
createLi05.textContent = time;
createLi07.textContent = residence;

$ul.appendChild(createLi01);
$ul.appendChild(createLi02);
$ul.appendChild(createLi03);
$ul.appendChild(createLi04);
$ul.appendChild(createLi05);
$ul.appendChild(createLi07);

// Created elements for the information of shopped items
let childEle = null;

//the number of itmes in cartObject
const countObj = Object.keys(shoppedItems).length;

//the number of elements that will create will be the same as the number of itmes in cartObject
for (let i = 0; i < countObj; i++) {
  childEle = document.createElement("li");
  childEle.className = "childEle";
  $ol.appendChild(childEle);
}

//Retrieve keys and values from the object
const objKeys = Object.keys(shoppedItems);
const objValues = Object.values(shoppedItems);
// let childElements = document.getElementsByClassName("childEle");
let childsAll = document.querySelectorAll(".childEle");

//the keys and values, which are the name and amount that a user chose will be printing
for (let i = 0; i < countObj; i++) {
  childsAll[i].textContent = `${objValues[i]} ${objKeys[i]}`;
}
