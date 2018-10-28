"use strict";

const template = document.querySelector(".js-template");
const listCards = document.querySelector(".list");
const input = document.querySelector(".js-form input[type=text]");
const form = document.querySelector(".js-form");

var regUrl = /^((ftp|http|https):\/\/)?(www\.|)([A-z|0-9]+)\.([A-z]{2,})/;

var source = template.innerHTML.trim();
var temp = Handlebars.compile(source);

var fetchUrl = function fetchUrl(url) {
  return fetch(
    "http://api.linkpreview.net/?key=5bd3191e2f043b0485292cde20d8a76cca37410a9f115&q=" +
      url
  )
    .then(function(response) {
      if (response.ok) return response.json();
      console.log(response);

      throw new Error("error");
    })
    .catch(function(err) {
      return console.error(err);
    });
};

Object.keys(localStorage).forEach(function(element) {
  fetchUrl(element).then(function(data) {
		listCards.insertAdjacentHTML("afterbegin", temp(data));
  });
});

function handleFormSubmit(evt) {
  evt.preventDefault();
	
  if (!regUrl.test(input.value)) {
    input.parentNode.reset();
    return alert("Невалидный URL! Попробуйте еще раз.");
  }

  fetchUrl(input.value).then(function(data) {
    if (localStorage.getItem(data.url) !== null)
      return alert("Такая закладка уже есть!");
    localStorage.setItem(data.url, data.url);
    var markup = temp(data);
    listCards.insertAdjacentHTML("afterbegin", markup);
  });
	// console.log(input.value);
	
  input.parentNode.reset();
}

function handleDelBtn(e) {
	e.preventDefault();
	
	if (e.target.nodeName !== "BUTTON") return;
	
	// console.log(e.target.closest("div").childNodes[4].name);
	
	localStorage.removeItem(e.target.closest("div").children[2].name);
	e.target.parentElement.remove();
}

form.addEventListener("submit", handleFormSubmit);
listCards.addEventListener("click", handleDelBtn);
