let main = document.querySelector("main")
let firstTier = document.querySelector(".firstTier");
let secondTier = document.querySelector(".secondTier");
let thirdTier = document.querySelector(".thirdTier");
let firstUL = document.querySelector(".firstUL");
let secondUL = document.querySelector(".secondUL");
let thirdUL = document.querySelector(".thirdUL");
let btn = document.querySelector("#favorite")
let userList = [];

//Carico i dati dall'API
async function loadData() {
    const response = await fetch("https://jsonplaceholder.typicode.com/todos");
    const users = await response.json();
    //Aggiungo il parametro priority
    return users.map((user) => {
        return {
            ...user,
            priority: Math.floor(Math.random() * 6)
        }
    });
}

async function renderData() {
    userList = await loadData();
    createCards();
}

function createCards() {
    userList.sort(function (a, b) {
        return b.priority - a.priority;
    });
    // Filtro i dati e li metto nei giusti div
    let priorityHigh = userList.filter((users) => users.priority > 3);
    let priorityMedium = userList.filter((users) => users.priority > 1 && users.priority < 4);
    let priorityLow = userList.filter((users) => users.priority < 2);

    priorityHigh.forEach(user => {
        let userCard = document.createElement("div");
        userCard.classList.add("userCard");
        let testo = userCard.textContent = `Priorità: ${user.priority} - ID :${user.id} - Descrizione: ${user.title}`;
        firstTier.appendChild(userCard);
    });
    priorityMedium.forEach(user => {
        let userCard = document.createElement("div");
        userCard.classList.add("userCard");
        let testo = userCard.textContent = `Priorità: ${user.priority} - ID :${user.id} - Descrizione: ${user.title}`;
        secondTier.appendChild(userCard);
    });
    priorityLow.forEach(user => {
        let userCard = document.createElement("div");
        userCard.classList.add("userCard");
        let testo = userCard.textContent = `Priorità: ${user.priority} - ID :${user.id} - Descrizione: ${user.title}`;
        thirdTier.appendChild(userCard);

    });
};

document.addEventListener("DOMContentLoaded", renderData, { once: true })
