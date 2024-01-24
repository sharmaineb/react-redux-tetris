import { createSlice } from '@reduxjs/toolkit'
import { defaultState, nextRotation, canMoveTo } from '../utils'

export const gameSlice = createSlice({
    name: 'game',
    initialState: defaultState(),
    reducers: {
      pause: (state) => {
            state.isRunning = false
            return state
      },
      resume: () => {},
      moveLeft: (state) => {
        const { shape, grid, x, y, rotation } = state
        if (canMoveTo(shape, grid, x - 1, y, rotation)) {
          state.x = x - 1
        }
        return state
      },
      moveRight: (state) => {
        const { shape, grid, x, y, rotation } = state
        if (canMoveTo(shape, grid, x + 1, y, rotation)) {
          state.x = x + 1
        }
        return state
      },

moveDown: (state) => {
  const { x, y, shape, grid, rotation, nextShape } = state
  // Get the next potential Y position
  const maybeY = y + 1
  // Check if the current block can move here
  if (canMoveTo(shape, grid, x, maybeY, rotation)) {
    // If so move the block
    state.y = maybeY
    return state
  },
  restart: () => defaultState()

  // ==============EDIT BEGIN================
  // If not place the block
  const { newGrid, gameOver } = addBlockToGrid(shape, grid, x, y, rotation)
  if (gameOver) {
    state.gameOver = true
    return state
  }
  // ==============EDIT END=================
  
  // reset some things to start a new shape/block
  state.x = 3
  state.y = -4
  state.rotation = 0
  state.grid = newGrid
  state.shape = nextShape
  state.nextShape = randomShape()

  if (!canMoveTo(nextShape, newGrid, 0, 4, 0)) {
    // Game Over
    console.log("Game Should be over...")
    state.shape = 0
    state.gameOver = true
    return state
  }

  // Update the score based on if rows were completed or not
  state.score += checkRows(newGrid)
    return state
 

    },
})

// Action creators are generated for each case reducer function
// Action creators are generated for each case reducer function
export const { 
    moveLeft, 
    moveRight, 
    moveDown, 
    rotate, 
    pause, 
    resume, 
    gameOver, 
    restart } = gameSlice.actions

export default gameSlice.reducer