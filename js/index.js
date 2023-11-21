const 정답 = "APPLE";

let index = 0;
let attempts = 0;
let timer;

function appStart() {
  const displayGameOver = () => {
    const div = document.createElement("div");
    div.innerText = "게임이 종료됐습니다.";
    div.style =
      "display:flex; justify-content:center; align-items:center; position:absolute; top:35vh; left:42vw; background-color: white; width:200px; height:50px; ";
    document.body.appendChild(div);
  };

  const gameOver = () => {
    window.removeEventListener("keydown", handleKeyDown);
    window.removeEventListener("click", handleClick);
    displayGameOver();
    clearInterval(timer);
  };

  const nextLine = () => {
    if (attempts === 6) return;
    attempts += 1;
    index = 0;
  };

  const handleEnterKey = () => {
    let 맞은_갯수 = 0;

    for (let i = 0; i < 5; i++) {
      const block = document.querySelector(
        `.board-block[data-index='${attempts}${i}']`
      );
      const 입력한_글자 = block.innerText;

      const keyboard = document.querySelector(
        `.keyboard-block[data-key='${입력한_글자}']`
      );
      const 정답_글자 = 정답[i];
      if (입력한_글자 === 정답_글자) {
        맞은_갯수 += 1;
        keyboard.style.background = "#6AAA64";
        block.style.background = "#6AAA64";
      } else if (정답.includes(입력한_글자)) {
        keyboard.style.background = "#C9B458";
        block.style.background = "#C9B458";
      } else {
        keyboard.style.background = "#787C7E";
        block.style.background = "#787C7E";
        keyboard.style.color = "white";
        block.style.color = "white";
      }
    }
    if (맞은_갯수 === 5) {
      gameOver();
    } else {
      nextLine();
    }
  };

  const handleBackSpace = () => {
    if (index > 0) {
      const preBlock = document.querySelector(
        `.board-block[data-index='${attempts}${index - 1}']`
      );
      preBlock.innerText = "";
    }
    if (index !== 0) {
      index -= 1;
    }
  };

  const handleKeyDown = (event) => {
    const key = event.key.toUpperCase();

    const keyCode = event.keyCode;

    const thisBlock = document.querySelector(
      `.board-block[data-index='${attempts}${index}']`
    );

    if (event.key === "Backspace") handleBackSpace();
    else if (index === 5) {
      if (event.key === "Enter") {
        handleEnterKey();
      } else {
        return;
      }
    } else if (65 <= keyCode && keyCode <= 90) {
      thisBlock.innerText = key;

      index++;
    }
  };

  const handleClick = (e) => {
    // console.log("클릭됨!", e);
    const key = e.target.dataset.key;
    // console.log("클릭키", key);
    const thisBlock = document.querySelector(
      `.board-block[data-index='${attempts}${index}']`
    );
    if (key === "BACK" || key === "Back") handleBackSpace();
    else if (index === 5) {
      if (key === "ENTER") handleEnterKey();
      else return;
    } else {
      if (key === "ENTER") return;
      else {
        thisBlock.innerText = key;
        index += 1;
      }
    }
  };
  const startTimer = () => {
    const start = new Date();

    function setTime() {
      const cur_time = new Date();
      const pass_time = new Date(cur_time - start);
      const min = pass_time.getMinutes().toString().padStart(2, "0");
      const sec = pass_time.getSeconds().toString().padStart(2, "0");
      const timeDiv = document.querySelector("#timer");
      timeDiv.innerText = `${min}:${sec}`;
    }
    timer = setInterval(setTime, 1000);
  };

  startTimer();
  window.addEventListener("keydown", handleKeyDown);
  window.addEventListener("click", handleClick);
}

appStart();
