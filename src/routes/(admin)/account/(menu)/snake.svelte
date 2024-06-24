<script>
  import { onMount, onDestroy } from "svelte"

  let canvas
  let ctx
  const width = 300
  const height = 300
  const gridSize = 10
  const tileCount = width / gridSize

  let snake = [{ x: 15, y: 15 }]
  let food = { x: 5, y: 5 }
  let dx = 0
  let dy = 0
  let score = 0
  let gameLoop

  function drawGame() {
    clearCanvas()
    moveSnake()
    drawSnake()
    drawFood()
    checkCollision()
    drawScore()
  }

  function clearCanvas() {
    ctx.fillStyle = "white"
    ctx.fillRect(0, 0, width, height)
  }

  function moveSnake() {
    const head = { x: snake[0].x + dx, y: snake[0].y + dy }
    snake.unshift(head)

    if (head.x === food.x && head.y === food.y) {
      score++
      generateFood()
    } else {
      snake.pop()
    }
  }

  function drawSnake() {
    ctx.fillStyle = "green"
    snake.forEach((segment) => {
      ctx.fillRect(
        segment.x * gridSize,
        segment.y * gridSize,
        gridSize - 1,
        gridSize - 1,
      )
    })
  }

  function drawFood() {
    ctx.fillStyle = "red"
    ctx.fillRect(
      food.x * gridSize,
      food.y * gridSize,
      gridSize - 1,
      gridSize - 1,
    )
  }

  function generateFood() {
    food.x = Math.floor(Math.random() * tileCount)
    food.y = Math.floor(Math.random() * tileCount)
  }

  function checkCollision() {
    const head = snake[0]

    if (
      head.x < 0 ||
      head.x >= tileCount ||
      head.y < 0 ||
      head.y >= tileCount
    ) {
      resetGame()
    }

    for (let i = 1; i < snake.length; i++) {
      if (head.x === snake[i].x && head.y === snake[i].y) {
        resetGame()
      }
    }
  }

  function resetGame() {
    snake = [{ x: 15, y: 15 }]
    food = { x: 5, y: 5 }
    dx = 0
    dy = 0
    score = 0
  }

  function drawScore() {
    ctx.fillStyle = "black"
    ctx.font = "16px Arial"
    ctx.fillText(`Score: ${score}`, 10, 20)
  }

  function handleKeydown(e) {
    switch (e.key) {
      case "ArrowUp":
        if (dy === 0) {
          dx = 0
          dy = -1
        }
        break
      case "ArrowDown":
        if (dy === 0) {
          dx = 0
          dy = 1
        }
        break
      case "ArrowLeft":
        if (dx === 0) {
          dx = -1
          dy = 0
        }
        break
      case "ArrowRight":
        if (dx === 0) {
          dx = 1
          dy = 0
        }
        break
    }
  }

  onMount(() => {
    ctx = canvas.getContext("2d")
    gameLoop = setInterval(drawGame, 100)
    window.addEventListener("keydown", handleKeydown)
  })

  onDestroy(() => {
    clearInterval(gameLoop)
    window.removeEventListener("keydown", handleKeydown)
  })
</script>

<canvas bind:this={canvas} {width} {height}></canvas>

<style>
  canvas {
    border: 1px solid black;
  }
</style>
