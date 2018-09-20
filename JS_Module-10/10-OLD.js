/*
  Написать приложение для работы с REST сервисом, 
  все функции делают запрос и возвращают Promise 
  с которым потом можно работать. 
  
  Реализовать следующий функционал:
  - функция getAllUsers() - должна вернуть текущий список всех пользователей в БД.
  
  - функция getUserById(id) - должна вернуть пользователя с переданным id.
  
  - функция addUser(name, age) - должна записывать в БД юзера с полями name и age.
  
  - функция removeUser(id) - должна удалять из БД юзера по указанному id.
  
  - функция updateUser(id, user) - должна обновлять данные пользователя по id. 
    user это объект с новыми полями name и age.
    
  Документацию по бэкенду и пример использования прочитайте 
  в документации https://github.com/trostinsky/users-api#users-api.
  Сделать минимальный графический интерфейс в виде панели с полями и кнопками. 
  А так же панелью для вывода результатов операций с бэкендом.
*/


"use strict";

const refs = {
	formAllUsers: document.querySelector(".js-all-users"),
	btnAllUsers: document.querySelector(".js-btn-all-users"),
	tBody: document.querySelector(".result-all-users"),
	formUserById: document.querySelector(".js-user-by-id"),
	inpUserById: document.querySelector(".user-by-id"),
	btnUserById: document.querySelector(".js-btn-user-by-id"),
	resultUserById: document.querySelector(".result-user-by-id"),
	formAddUser: document.querySelector(".js-add-user"),
	inputNewName: document.querySelector(".new-name"),
	inputNewAge: document.querySelector(".new-age"),
	resultNewUser: document.querySelector(".result-new-user"),
	formRemoveUser: document.querySelector(".js-remove-user"),
	inputRemoveUser: document.querySelector(".id-remove"),
	resultRemoveUser: document.querySelector('.result-remove-user'),
	formUpdate: document.querySelector('.js-update-user'),
	inputUpdateId: document.querySelector('.input-update-id'),
	inputUpdateName: document.querySelector('.input-update-name'),
	inputUpdateAge: document.querySelector('.input-update-age'),
	resultUpdate: document.querySelector('.result-update'),
};

refs.formAllUsers.addEventListener('submit', handleGetAllUsers);

function handleGetAllUsers(evt) {
	evt.preventDefault();
	fetchUsers().then(updateInfo);
}


function fetchUsers() {
	const url = "https://test-users-api.herokuapp.com/users";
	return fetch(url)
		.then(response => {
			if (response.ok) return response.json();
			throw new Error("Error fetching data");
		})
		.catch(error => {
			console.error("Error: ", error);
		});
}

function updateInfo(resp) {
	const array = resp.data;
	const htmlStr = array.reduce((acc, user) => acc + crTbRw(user), "");
	refs.tBody.innerHTML = htmlStr;
}

function crTbRw({ id, name, age }) {
	return `
	<tr>
    <td>${id}</td>
    <td>${name}</td>
    <td>${age}</td>
    </tr>
	`
}
//- функция getUserById(id) - должна вернуть пользователя с переданным id.

refs.formUserById.addEventListener('submit', handleGetUserId);

function handleGetUserId(evt) {
	evt.preventDefault();
	fetchUsers().then(getUserById);
}

function getUserById(id) {
	const array = id.data;
	console.log(array);
	const user = array.find(el => el.id === refs.inpUserById.value);
	// console.log(user);
	if (user === 'undefind') {
		refs.resultUserById.textContent = `Пользователь ${refs.inpUserById.value} не найден`
	};
	refs.resultUserById.innerHTML = `
	<ul>
		<li>ID: ${user.id}</li>
		<li>NAME: ${user.name}</li>
		<li>AGE: ${user.age}.</li>
		</ul>
	`
};


//функция addUser(name, age) - должна записывать в БД юзера с полями name и age.

refs.formAddUser.addEventListener('submit', handleNewUser);

function handleNewUser(evt) {
	evt.preventDefault();
	fetchNewUser();
	updateUsersInfo();
};

function updateUsersInfo() {
	refs.resultNewUser.textContent = `Новый пользователь ${refs.inputNewName.value} занесен в базу пользователей`;
};

function fetchNewUser(name, age) {
	const newUser = {
		name: `${refs.inputNewName.value}`,
		age: `${refs.inputNewAge.value}`
	};
	fetch('https://test-users-api.herokuapp.com/users', {
		method: 'POST',
		body: JSON.stringify(newUser),
		headers: {
			"Content-type": "application/json; charset=UTF-8"
		}
	})
		.then(response => response.json())
		.then(data => console.log(data))
		.catch(error => console.log('ERROR' + error));
};

//функция removeUser(id) - должна удалять из БД юзера по указанному id.

refs.formRemoveUser.addEventListener("submit", handleRemoveUserById);

function handleRemoveUserById(evt) {
	evt.preventDefault();
	fetchUsers().then(findUserById);
};

function updateAfterRemoving() {
	refs.resultRemoveUser.textContent = `Пользователь ${refs.inputRemoveUser.value} удален из базы`;
};

function findUserById(inf) {
	const array = inf.data;
	// console.log(array);
	const find = array.find(el => el.id === refs.inputRemoveUser.value);
	// console.log(find);
	fetchRemUser();

};

function fetchRemUser() {
	fetch(`https://test-users-api.herokuapp.com/users/${refs.inputRemoveUser.value}`, {
		method: 'DELETE'
	}).then(() => console.log('success'))
		.catch(error => console.log('ERROR' + error));
};

// функция updateUser(id, user) - должна обновлять данные пользователя по id. 
// user это объект с новыми полями name и age.

refs.formUpdate.addEventListener("submit", handleUpdateUserInfo);

function handleUpdateUserInfo(evt) {
	evt.preventDefault();
	fetchUpdate();
	updateUserInfo();
};

function fetchUpdate() {
	const userToUpdate = {
		name: `${refs.inputUpdateName.value}`,
		age: `${refs.inputUpdateAge.value}`
	};

	fetch(`https://test-users-api.herokuapp.com/users/${refs.inputUpdateId.value}`, {
		method: 'PUT',
		body: JSON.stringify(userToUpdate),
		headers: {
			"Content-type": "application/json; charset=UTF-8"
		}
	})

		.then(response => response.json())
		.then(data => console.log(data))
		.catch(error => console.log('ERROR' + error));
};

function updateUserInfo() {
	refs.resultUpdate.textContent = `Данные пользователя ${refs.inputUpdateId.value} обновлены!`;
};







