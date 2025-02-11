const img = ["gajah", "orang", "semut"];
const playerContainer = document.querySelector(".player-container");
const layerButton = document.querySelector(".layer button");
const playAgainButton = document.querySelector("button.hidden");
const statusElement = document.querySelector('.status');
const thumbnail = document.querySelector('.thumbnail');

let randomEnemy;
let randomPilihanEnemy = () => {
    let counter = 0;
    randomEnemy = setInterval(() => {
        if (counter >= img.length) {
            counter = 0;
        }
        let enemy = document.querySelector(".enemy");
        enemy.setAttribute('src', `img/${img[counter]}.png`);
        counter++;
    }, 500)
}

let stopPilihanEnemy = () => {
    clearInterval(randomEnemy);
    randomEnemy = null;
}

const listPilihanPlayer = () => {
    const player = playerContainer.querySelector('.player');
    player.remove();

    for (let i = 0; i < img.length; i++) {
        const element = document.createElement("img");
        element.src = `img/${img[i]}.png`;
        element.classList.add("gambar", "player", "player-animasi");
        playerContainer.append(element);
    }

    statusElement.innerHTML = "TENTUKAN PILIHANMU!";
    statusElement.classList.remove("status-animasi");

    playerContainer.addEventListener("click", playerMemilih)
    thumbnail.classList.remove("thumbnail");
}

const resultGame = (player, enemy) => {
    let status;

    if (player === enemy) {
        status = "draw"
    } else if (player === img[0] && enemy === img[1]) {
        status = true;
    } else if (player === img[1] && enemy === img[2]) {
        status = true;
    } else if (player === img[2] && enemy === img[0]) {
        status = true;
    } else {
        status = false;
    }

    if (status === "draw") {
        statusElement.innerHTML = "SEIMBANG!";
    } else if (status) {
        statusElement.innerHTML = "KAMU MENANG!";
    } else {
        statusElement.innerHTML = "KAMU KALAH!";
    }
    statusElement.classList.add("status-animasi");
}

let hapusSelainPilihanPlayer = (pilihan) => {
    let bukanPilihan = [];
    for (const e of playerContainer.children) {
        if (e !== pilihan) {
            bukanPilihan.push(e)
        }
        e.classList.remove("player-animasi");
    }
    
    bukanPilihan.forEach(e => {
        e.remove();
    })

    playAgainButton.style.display = "block";
}

layerButton.addEventListener("click", function() {
    this.parentElement.parentElement.style.display = "none";
    listPilihanPlayer();
    randomPilihanEnemy();
})

function playerMemilih(e) {
    stopPilihanEnemy()

    const player = e.target.getAttribute('src').split('.')[0].split('/')[1];
    enemy = document.querySelector(".enemy").getAttribute('src').split('.')[0].split('/')[1];

    hapusSelainPilihanPlayer(e.target)
    resultGame(player, enemy);

    e.target.style.cursor = "default";
    playerContainer.removeEventListener("click", playerMemilih);
}

playAgainButton.addEventListener("click", function() {
    listPilihanPlayer();
    randomPilihanEnemy();

    playAgainButton.style.display = "none";
})