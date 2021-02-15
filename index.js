async function loadData() {
    let userList = [];
    const response = await fetch("https://jsonplaceholder.typicode.com/todos");
    const users = await response.json();
    userList = users.map((user) => {
        return {
            ...user,
            priority: Math.floor(Math.random() * 6)
        }
    });
    console.log(userList)
}

loadData();