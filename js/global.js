// returns random element given arr
const randChoice = (arr) => {
    const randIndex = Math.floor(Math.random() * arr.length);
    return arr[randIndex];
}

// load header & footer html code
$("#header-container").load("./partials/header.html");
$("#footer-container").load("./partials/footer.html");