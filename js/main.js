const dino = document.querySelector(".dino");

const handleKeyUp = ({ keyCode }) => {
  if (keyCode == 32 && !dino.classList.contains("dino-jump")) {
    console.log("pressionou espaço");
    jump();
  }
};

const jump = () => {
  dino.classList.add("dino-jump");
  setTimeout(() => {
    dino.classList.remove("dino-jump");
  }, 1000);
};

document.addEventListener("keyup", handleKeyUp);
