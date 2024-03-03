const canvas = document.getElementById("canvas");
const ctx = canvas.getContext("2d");

const cellCount = 12;
const cellSize = 400 / cellCount;
let array = [];
const snake = [
  [3, 6],
  [2, 6],
  [1, 6],
];
let force = "none";
let appleEaten = false;
let applepos = [8, 6];
let eaten = true;

function appleGenerator() {
  let possiblePos = [];
  for (let i = 0; i < cellCount; i++) {
    for (let j = 0; j < cellCount; j++) {
      possiblePos.push([j, i]);
    }
  }

  for (let i = 0; i < snake.length; i++) {
    possiblePos[snake[0] * cellCount + snake[1]] = null;
  }

  possiblePos = possiblePos.filter((pos) => {
    return pos != undefined;
  });
  const apple = Math.floor(Math.random() * possiblePos.length);

  return possiblePos[apple];
}

const interval = setInterval(function () {
  let gameover = false;
  let eaten = false;
  if (snake[0][1] == applepos[1] && snake[0][0] == applepos[0]) {
    applepos = appleGenerator();
    eaten = true;
  }

  if (force != "none") {
    let head = [snake[0][0], snake[0][1]];
    if (eaten == false) {
      snake.pop();
    }

    if (force == "Right") {
      head[0] = head[0] + 1;
    } else if (force == "Left") {
      head[0] = head[0] - 1;
    } else if (force == "Up") {
      head[1] = head[1] - 1;
    } else if (force == "Down") {
      head[1] = head[1] + 1;
    }
    snake.unshift([head[0], head[1]]);
  }

  for (let i = 1; i < snake.length - 1; i++) {
    if (snake[0][0] == snake[i][0] && snake[0][1] == snake[i][1]) {
      clearInterval(interval);
      console.log("hit body");
    }
  }
  if (0 > snake[0][1] || 11 < snake[0][1]) {
    clearInterval(interval);
  }
  if (0 > snake[0][0]) {
    for(let i = 0; i < snake.length; i++){
      snake[i][0] = snake[i][0] +1
    }
    clearInterval(interval);
  }
  if (11 < snake[0][0]) {
    for(let i = 0; i < snake.length; i++){
      snake[i][0] = snake[i][0] -1
    }
    clearInterval(interval);
  }
  array = [];
  gathergrid(array, snake, applepos);
  Renderer(array);

  console.log(snake[0][0]);
}, 100);

document.addEventListener("keydown", function Movement(event) {
  if (event.key == "ArrowUp") {
    force = "Up";
  } else if (event.key == "ArrowDown") {
    force = "Down";
  } else if (event.key == "ArrowRight") {
    force = "Right";
  } else if (event.key == "ArrowLeft") {
    force = "Left";
  } else {
    force = "none";
  }
});

function gathergrid(array, snake, applepos) {
  for (let i = 0; i < cellCount; i++) {
    array.push([]);
    for (let j = 0; j < cellCount; j++) {
      array[i].push(0);
    }
  }

  for (let i = 0; i < snake.length; i++) {
    array[snake[i][1]][snake[i][0]] = 1;
  }

  array[applepos[1]][applepos[0]] = 2;
}

function Renderer(doubleArray) {
  let colorswitch = true;

  for (let i = 0; i < cellCount; i++) {
    for (let j = 0; j < cellCount; j++) {
      if (doubleArray[j][i] == 0) {
        if (i % 2 == j % 2) {
          ctx.fillStyle = "#84b444";
        } else {
          ctx.fillStyle = "#a7d350";
        }
      } else if (doubleArray[j][i] == 1) {
        ctx.fillStyle = "blue";
      } else if (doubleArray[j][i] == 2) {
        ctx.fillStyle = "red";
      }

      ctx.fillRect(
        Math.floor(i * cellSize),
        Math.floor(j * cellSize),
        Math.ceil(cellSize),
        Math.ceil(cellSize)
      );
    }
  }
}
