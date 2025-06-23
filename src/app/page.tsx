'use client';

import { useState } from 'react';
import styles from './page.module.css';

export default function Home() {
  const originBoard: number[][] = [
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
  ];
  const [board, setBoard] = useState(originBoard);

  const directions: number[][] = [
    [-1, 0],
    [1, 0],
    [0, -1],
    [0, 1],
  ];

  const clickHandler = () => {
    const newBoard = structuredClone(board);
    const boardHeight = newBoard.length;
    const boardWidth = newBoard[0].length;

    const doNothing = () => {};

    const extendWall = (y: number, x: number) => {
      const randomIndex = Math.floor(Math.random() * directions.length);
      const [dy, dx] = directions[randomIndex];
      const newY = y + dy;
      const newX = x + dx;

      const isInBounds = newY >= 0 && newY < boardHeight && newX >= 0 && newX < boardWidth;
      if (isInBounds) {
        newBoard[newY][newX] = 1;
      }
    };

    const actions = [doNothing, extendWall];

    board.forEach((row, y) => {
      row.forEach((cell, x) => {
        actions[cell](y, x);
      });
    });

    setBoard(newBoard);
  };

  return (
    <div className={styles.container}>
      <div className={styles.button} onClick={clickHandler} />
      <div className={styles.board}>
        {board.map((row, y) =>
          row.map((color, x) => (
            <div
              className={styles.cell}
              key={`${x}-${y}`}
              style={{ background: color === 1 ? `#000` : `#0ff` }}
            />
          )),
        )}
      </div>
    </div>
  );
}
