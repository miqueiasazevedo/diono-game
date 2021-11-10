//O valor da altura do dino e do cacto também é atribuido a largura
const DINO_HEIGHT = 60;
const CACTUS_HEIGHT = 60;
const JUMP_TIME = 500;

const root = document.documentElement;
const dino = document.querySelector(".dino");

root.style.setProperty("--jump-time", JUMP_TIME / 1000 + "s");
root.style.setProperty("--dino-height", DINO_HEIGHT + "px");
root.style.setProperty("--cactus-height", CACTUS_HEIGHT + "px");

const background = document.querySelector(".background");

let dinoJumpPositon = 0;
let isJumping = false;

const handleKeyDown = ({ keyCode }) => {
  if (keyCode == 32 && !isJumping) {
    jump();
  }
};

const jump = () => {
  isJumping = true;

  let upInterval = setInterval(() => {
    if (dinoJumpPositon >= CACTUS_HEIGHT * 3) {
      clearInterval(upInterval);

      let downInterval = setInterval(() => {
        if (dinoJumpPositon <= 0) {
          clearInterval(downInterval);
          isJumping = false;
        } else {
          dinoJumpPositon -= 20;
          dino.style.bottom = dinoJumpPositon + "px";
        }
      }, 20);
    } else {
      dinoJumpPositon += 20;
      dino.style.bottom = dinoJumpPositon + "px";
    }
  }, 20);

  /* Alternativa para o salto do dino. Desta forma a animação é feita no css e evita o encadeamente de if's.
     No entanto, desta forma não é possível validar a posição vertica do dino na passagem do cacto */
  /*   dino.classList.add("dino-jump");
    isJumping = true;
    setTimeout(() => {
      dino.classList.remove("dino-jump");
      console.log(dino.style.bottom.val);
      isJumping = false;
  }, JUMP_TIME); */
};

const createCactus = () => {
  let cactus = document.createElement("div");
  cactus.classList.add("cactus");
  let cactusPosition = 2000;

  cactusRandom = Math.random() * 4000;

  cactus.style.left = cactusPosition + "px";
  background.appendChild(cactus);

  let leftInterval = setInterval(() => {
    let cactusOnScreen = cactusPosition > 0;
    let cactusTouchDino =
      cactusPosition < DINO_HEIGHT + 10 && dinoJumpPositon < CACTUS_HEIGHT;
    if (cactusPosition < -CACTUS_HEIGHT) {
      clearInterval(leftInterval);
      background.removeChild(cactus);
    } else if (cactusOnScreen && cactusTouchDino) {
      alert("Game Over");
    } else {
      cactusPosition -= 10;
      cactus.style.left = cactusPosition + "px";
    }
  }, 20);
  setTimeout(createCactus, cactusRandom);
};

document.addEventListener("keydown", handleKeyDown);
createCactus();
