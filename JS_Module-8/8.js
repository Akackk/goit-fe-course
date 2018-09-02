
const imgGal = document.querySelector('.js-image-gallery');
const fullView = document.createElement('div');
const fullImg = document.createElement('img');
const img = document.createElement('img');
const imgList = document.createElement('ul');
const li = document.createElement('li');

imgGal.appendChild(fullView);
imgGal.appendChild(imgList);
fullView.appendChild(fullImg);

const list = document.querySelector('ul');

// Вставка во fullView изображения по-умолчанию
fullView.innerHTML = `<img src="img/street_550_550.jpg" alt="alt text 1"></img>`;

// Присвоение списку класса
imgList.setAttribute('class', 'preview');

const galleryItems = [
	{ preview: 'img/street_150_150.jpg', fullview: 'img/street_550_550.jpg', alt: "alt text 1" },
	{ preview: 'img/tower_150_150.jpg', fullview: 'img/tower_550_550.jpg', alt: "alt text 2" },
	{ preview: 'img/tree_150_150.jpg', fullview: 'img/tree_550_550.jpg', alt: "alt text 3" }
];

// Создание галереи
(function createImg(galleryItems) {
	for (i = 0; i < galleryItems.length; i++) {
		createPreview();
	};
})(galleryItems);

//Выделение preview выбранного по-умолчанию при загрузке страницы 
const previewImg = list.querySelectorAll('img');
const frstPreviewImg = previewImg[0];
frstPreviewImg.setAttribute('class', 'active');

// Вставка во fullView выбранного изображения
function createFullview() {
	event.preventDefault();
	fullView.innerHTML = `<img src=${event.target.dataset.fullview} alt=${event.target.alt}></img>`;
};


//Создание блоков preview
function createPreview() {
	imgList.innerHTML += `<li><img src=${galleryItems[i].preview} data-fullview=${galleryItems[i].fullview} alt=${i + 1}></li>`;
};

// Выделения активного PREVIEW

function setActiveImg(nextActiveImg) {
	const currentActiveImg = list.querySelector("img.active");

	if (currentActiveImg) {
		currentActiveImg.classList.remove("active");
	}

	nextActiveImg.classList.add("active");
};

// !!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
const handleClick = event => {
	event.preventDefault();
	const target = event.target;
	if (target.hasAttribute("data-fullview")) {
		createFullview();
	};

	if (target.nodeName !== "IMG") return;

	setActiveImg(target);

};

imgGal.addEventListener('click', handleClick);

//!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!

