let main = document.querySelector("main")
let firstTier = document.querySelector(".firstTier");
let secondTier = document.querySelector(".secondTier");
let thirdTier = document.querySelector(".thirdTier");
let firstUL = document.querySelector(".firstUL");
let secondUL = document.querySelector(".secondUL");
let thirdUL = document.querySelector(".thirdUL");
let btn = document.querySelector(".btnCompleted")


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
    })
        .sort(function (a, b) {
            return b.priority - a.priority;
        });

}
//Assegno i dati della chiamata ad un array e lo divido in 3 priorità
async function renderData() {
    let userList = await loadData();
    let priorityHigh = userList.filter((users) => users.priority > 3);
    let priorityMedium = userList.filter((users) => users.priority > 1 && users.priority < 4);
    let priorityLow = userList.filter((users) => users.priority < 2);
    renderCards(priorityHigh, firstTier);
    renderCards(priorityMedium, secondTier);
    renderCards(priorityLow, thirdTier);
}

//Questa funzione crea le card per ciascuna priorità
function renderCards(priority, tier) {
    priority.forEach(user => {
        let userCard = document.createElement("div");
        userCard.classList.add("userCard");
        if (user.completed) {
            userCard.classList.add("completed");
        } else userCard.classList.add("toDo");
        userCard.textContent = `Priorità: ${user.priority} - ID :${user.id} - Descrizione: ${user.title}`;
        tier.appendChild(userCard);
    })

}

//Regola il funzionamento del bottone
function toggleShowCompleted() {
    if (btn.innerHTML === "Mostra solo completati") {
        btn.innerHTML = "Mostra tutti"
    } else btn.innerHTML = "Mostra solo completati";

    let userCard = document.querySelectorAll(".toDo");
    userCard.forEach(element => element.classList.toggle("hidden"));
    btn.classList.toggle("showCompleted");

};

btn.addEventListener("click", toggleShowCompleted)
document.addEventListener("DOMContentLoaded", renderData, { once: true })
