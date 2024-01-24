import { createSlice } from '@reduxjs/toolkit';
import { defaultState, nextRotation, canMoveTo, addBlockToGrid, randomShape, checkRows } from '../utils';

export const gameSlice = createSlice({
  name: 'game',
  initialState: defaultState(),
  reducers: {
    pause: (state) => {
      state.isRunning = false;
      return state;
    },
    resume: (state) => {
      state.isRunning = true;
      return state;
    },
    moveLeft: (state) => {
      const { shape, grid, x, y, rotation } = state;
      if (canMoveTo(shape, grid, x - 1, y, rotation)) {
        state.x = x - 1;
      }
      return state;
    },
    moveRight: (state) => {
      const { shape, grid, x, y, rotation } = state;
      if (canMoveTo(shape, grid, x + 1, y, rotation)) {
        state.x = x + 1;
      }
      return state;
    },
    moveDown: (state) => {
      const { x, y, shape, grid, rotation, nextShape } = state;
      const maybeY = y + 1;
      if (canMoveTo(shape, grid, x, maybeY, rotation)) {
        state.y = maybeY;
        return state;
      }

      const { newGrid, gameOver } = addBlockToGrid(shape, grid, x, y, rotation);
      if (gameOver) {
        state.gameOver = true;
        return state;
      }

      state.x = 3;
      state.y = -4;
      state.rotation = 0;
      state.grid = newGrid;
      state.shape = nextShape;
      state.nextShape = randomShape();

      if (!canMoveTo(nextShape, newGrid, 0, 4, 0)) {
        state.shape = 0;
        state.gameOver = true;
        return state;
      }

      state.score += checkRows(newGrid);
      return state;
    },
    rotate: (state) => {
      const { shape, grid, x, y, rotation } = state;
      const newRotation = nextRotation(shape, rotation);
      if (canMoveTo(shape, grid, x, y, newRotation)) {
        state.rotation = newRotation;
      }
      return state;
    },
    gameOver: () => {},
    restart: () => defaultState(),
  },
});

export const {
  moveLeft,
  moveRight,
  moveDown,
  rotate,
  pause,
  resume,
  gameOver,
  restart,
} = gameSlice.actions;

export default gameSlice.reducer;
