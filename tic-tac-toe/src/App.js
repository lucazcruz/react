import React, {useState} from "react";

const calculateWinner = (squares) => {
  const lines = [
    [0,1,2],
    [3,4,5],
    [6,7,8],
    [0,3,6],
    [1,4,7],
    [2,5,8],
    [0,4,8],
    [2,4,6]
  ];

  for (let i = 0; i < lines.length; i++) {
    const [a,b,c] = lines[i];
    if (squares[a] && squares[a] === squares[b] && squares[b] === squares[c]) {
      return squares[a]
    }
  }
  return null
}

const Squares = ({ onClickSquare, value }) => {
  return <button className="square" onClick={onClickSquare}>{value}</button>;
}

const Board = () => {
  const [squares, setSquares] = useState(Array(9).fill(null))
  const [xIsNext, setXIsNext] = useState(true)

  function handleClick(i) {
    if (calculateWinner(squares) || squares[i]) {
      return;
    }

    const nextSquare = squares.slice();

    if (xIsNext) {
      nextSquare[i] = 'X'
    } else {
      nextSquare[i] = 'O'
    }

    setSquares(nextSquare)
    setXIsNext(!xIsNext)
  }

  const winner = calculateWinner(squares);
  let status;

  if (winner) {
    status = `Winner: ${winner}`
  } else {
    status = `Next is: ${xIsNext? 'X': 'O'}`
  }


  return (
    <>
      <div className='status' >{status}</div>
      <div className="board-row">
        <Squares onClickSquare={() => handleClick(0)} value={squares[0]} />
        <Squares onClickSquare={() => handleClick(1)} value={squares[1]} />
        <Squares onClickSquare={() => handleClick(2)} value={squares[2]} />
      </div>
      <div className="board-row">
        <Squares onClickSquare={() => handleClick(3)} value={squares[3]} />
        <Squares onClickSquare={() => handleClick(4)} value={squares[4]} />
        <Squares onClickSquare={() => handleClick(5)} value={squares[5]} />
      </div>
      <div className="board-row">
        <Squares onClickSquare={() => handleClick(6)} value={squares[6]} />
        <Squares onClickSquare={() => handleClick(7)} value={squares[7]} />
        <Squares onClickSquare={() => handleClick(8)} value={squares[8]} />
      </div>
    </>
  )
}

const App = () => {
  return <Board />
}

export default App;
