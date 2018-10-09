/*
  Реализуйте форму фильтра товаров в каталоге и список отфильтрованных товаров.
  Используйте шаблонизацию для создания карточек товаров.
  
  Есть массив объектов (дальше в задании), каждый из которых описывает 
  ноутбук с определенными характеристиками.
  
  Поля объекта по которым необходимо производить фильтрацию: size, color, release_date.
  Поля объекта для отображения в карточке: name, img, descr, color, price, release_date.
    
  Изначально есть форма с 3-мя секциями, состоящими из заголовка и группы 
  чекбоксов (разметка дальше в задании). После того как пользователь выбрал 
  какие либо чекбоксы и нажал кнопку Filter, необходимо собрать значения чекбоксов по группам. 
  
  🔔 Подсказка: составьте объект формата
      const filter = { size: [], color: [], release_date: [] }
    
  После чего выберите из массива только те объекты, которые подходят 
  под выбраные пользователем критерии и отрендерите список карточек товаров.
  
  🔔 Каждый раз когда пользователь фильтрует товары, список карточек товаров очищается, 
      после чего в нем рендерятся новые карточки товаров, соответствующих текущим критериям фильтра.
*/
"use strict";

const laptops = [
  {
    size: 13,
    color: "white",
    price: 28000,
    release_date: 2015,
    name: 'Macbook Air White 13"',
    img: "http://demo.posthemes.com/pos_zadademo/images/placeholder.png",
    descr:
      "Lorem ipsum dolor sit amet consectetur adipisicing elit. Quaerat, beatae."
  },
  {
    size: 13,
    color: "gray",
    price: 32000,
    release_date: 2016,
    name: 'Macbook Air Gray 13"',
    img: "http://demo.posthemes.com/pos_zadademo/images/placeholder.png",
    descr:
      "Lorem ipsum dolor sit amet consectetur adipisicing elit. Quaerat, beatae."
  },
  {
    size: 13,
    color: "black",
    price: 35000,
    release_date: 2017,
    name: 'Macbook Air Black 13"',
    img: "http://demo.posthemes.com/pos_zadademo/images/placeholder.png",
    descr:
      "Lorem ipsum dolor sit amet consectetur adipisicing elit. Quaerat, beatae."
  },
  {
    size: 15,
    color: "white",
    price: 45000,
    release_date: 2015,
    name: 'Macbook Air White 15"',
    img: "http://demo.posthemes.com/pos_zadademo/images/placeholder.png",
    descr:
      "Lorem ipsum dolor sit amet consectetur adipisicing elit. Quaerat, beatae."
  },
  {
    size: 15,
    color: "gray",
    price: 55000,
    release_date: 2016,
    name: 'Macbook Pro Gray 15"',
    img: "http://demo.posthemes.com/pos_zadademo/images/placeholder.png",
    descr:
      "Lorem ipsum dolor sit amet consectetur adipisicing elit. Quaerat, beatae."
  },
  {
    size: 15,
    color: "black",
    price: 45000,
    release_date: 2017,
    name: 'Macbook Pro Black 15"',
    img: "http://demo.posthemes.com/pos_zadademo/images/placeholder.png",
    descr:
      "Lorem ipsum dolor sit amet consectetur adipisicing elit. Quaerat, beatae."
  },
  {
    size: 17,
    color: "white",
    price: 65000,
    release_date: 2015,
    name: 'Macbook Air White 17"',
    img: "http://demo.posthemes.com/pos_zadademo/images/placeholder.png",
    descr:
      "Lorem ipsum dolor sit amet consectetur adipisicing elit. Quaerat, beatae."
  },
  {
    size: 17,
    color: "gray",
    price: 75000,
    release_date: 2016,
    name: 'Macbook Pro Gray 17"',
    img: "http://demo.posthemes.com/pos_zadademo/images/placeholder.png",
    descr:
      "Lorem ipsum dolor sit amet consectetur adipisicing elit. Quaerat, beatae."
  },
  {
    size: 17,
    color: "black",
    price: 80000,
    release_date: 2017,
    name: 'Macbook Pro Black 17"',
    img: "http://demo.posthemes.com/pos_zadademo/images/placeholder.png",
    descr:
      "Lorem ipsum dolor sit amet consectetur adipisicing elit. Quaerat, beatae."
  }
];

// const filter = { size: [13], color: [], release_date: [] }

listUpd(laptops);

function listUpd(list) {
  const container = document.querySelector("#card-container");
  if (list.length === 0) {
    container.innerHTML = "<p>The list is empty</p>";
    return;
  }

  const templateCard = document.querySelector("#product-card").innerHTML.trim();
  const template = Handlebars.compile(templateCard);
  const markup = list.reduce((acc, item) => acc + template(item), "");
  container.innerHTML = markup;
}

// !!!!!!!!!!!!!!!!!!!!!!!!Create filtered object!!!!!!!!!!!!!!!!!!!!!!!!!!
const filter = {};
filter.size = [];
filter.color = [];
filter.release_date = [];

function filtered() {
  const chbx = document.querySelectorAll("input[type=checkbox]");

  chbx.forEach(i => {
    if (i.checked && i.getAttribute("name") == "size") {
      filter.size.push(Number(i.value));
    };
    if (i.checked && i.getAttribute("name") === "color") {
      filter.color.push(i.value);
    };
    if (i.checked && i.getAttribute("name") === "release_date") {
      filter.release_date.push(Number(i.value));
		};
		return
  });

  // const chbxSz = document.querySelectorAll("input[name=size]");
  // const chbxClr = document.querySelectorAll("input[name=color]");
  // const chbxRD = document.querySelectorAll("input[name=release_date]");

  // chbxSz.forEach(i => i.checked ? filter.size.push(Number(i.value)) : null);
  // // for (let i in chbxSz) {
  // //   if (chbxSz[i].checked) {
  // //     filter.size.push(Number(chbxSz[i].value));
  // //   }
  // // }
  // chbxClr.forEach(i => i.checked ? filter.color.push(i.value) : null);
  // // for (let i in chbxClr) {
  // //   if (chbxClr[i].checked) {
  // //     filter.color.push(chbxClr[i].value);
  // //   }
  // // }
  // chbxRD.forEach(i => i.checked ? filter.release_date.push(Number(i.value)) : null);
  // // for (let i in chbxRD) {
  // //   if (chbxRD[i].checked) {
  //     // filter.release_date.push(Number(chbxRD[i].value));
  // //   }
  // // }
  // console.log(filter);
}

// !!!!!!!!!!!!!!!!!!!Отображение отфильтрованных

// const filteredLaptops = Object.keys(filter).reduce((res, key) => {
// 	console.log(filter);

// 	if (filter[key].length){
// 		return res.filter(l => filter[key].includes(l[key]))
// 	}
// 	return res;

// }, [...laptops]);

const filterForm = document.querySelector("#filter-form");
filterForm.addEventListener("submit", handleSubmit);

const clearFiltr = document.querySelector("button[type=reset]");
clearFiltr.addEventListener("click", handleReset);

function handleReset(e) {
  // e.preventDefault(); ------- because chbx re
  filter.size = [];
  filter.color = [];
  filter.release_date = [];
  listUpd(laptops);
}

function handleSubmit(e) {
  e.preventDefault();
  filter.size = [];
  filter.color = [];
  filter.release_date = [];
  filtered();
  console.log(filter);
  const filteredLaptops = Object.keys(filter).reduce(
    (res, key) => {
      if (filter[key].length) {
        return res.filter(l => filter[key].includes(l[key]));
      }
      return res;
    },
    [...laptops]
  );
  // console.log(filteredLaptops);

  listUpd(filteredLaptops);
}
