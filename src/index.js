import React from 'react';
import ReactDOM from 'react-dom';
import './index.scss';

function Square(props) {
    return (
        <button
            className='square'
            player={props.value}
            onClick={props.onClick}
            winner={props.highlight ? 'yes' : 'no'}>
            {props.value}
        </button>
    )
}

class Board extends React.Component {

    renderSquare(i) {
        const winnerPositions = this.props.winnerPositions;
        return <Square
            key={i}
            value={this.props.squares[i]}
            onClick={() => this.props.onClick(i)}
            highlight={winnerPositions && winnerPositions.includes(i)} />;
    }

    render() {
        let squares = [];
        for (let i = 0; i < 9; i++) {
            squares.push(this.renderSquare(i));
        }
        return (<div className="game-board">{squares}</div>);
    }
}

class Game extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            history: [
                {
                    squares: Array(9).fill(null),
                }
            ],
            stepNumber: 0,
            xIsNext: true,
        };
    }
    render() {
        const history = this.state.history;
        const current = history[this.state.stepNumber];
        const winnerExists = calculateWinner(current.squares);
        const winner = winnerExists.winner;
        const player = winner ?
            winner : this.state.xIsNext ? 'X' : 'O';
        const status = winner ?
            `Winner: ${player}` : `Next player: ${player}`;
        const moveHistory = history.map((step, move) => {
            const desc = move ? `Go to move #${move}` : 'Go to game start';
            const player = move === 0 ? null : move % 2 !== 0 ? 'X' : 'O';
            return (
                <button key={move}
                    onClick={() => this.jumpTo(move)}
                    className="jump-button"
                    player={player}>{desc}</button>
            );
        });

        return (
            <div className="game">
                <Board
                    squares={current.squares}
                    onClick={(i) => this.handleClick(i)}
                    winnerPositions={winnerExists.winnerPositions} />

                <div className="game-info">
                    <div className="status"
                        player={player}>{status}
                    </div>
                    {moveHistory}
                </div>
            </div>
        );
    }

    handleClick(i) {
        const history = this.state.history.slice(0, this.state.stepNumber + 1);
        const current = history[history.length - 1];
        const squares = current.squares.slice();
        if (calculateWinner(squares).winner || squares[i]) {
            return;
        }
        squares[i] = this.state.xIsNext ? 'X' : 'O';
        this.setState({
            history: history.concat([{
                squares: squares,
            }]),
            stepNumber: history.length,
            xIsNext: !this.state.xIsNext,
        });
    }

    jumpTo(step) {
        this.setState({
            stepNumber: step,
            xIsNext: (step % 2) === 0
        });
    }
}

// ========================================

function calculateWinner(squares) {
    const lines = [
        [0, 1, 2],
        [3, 4, 5],
        [6, 7, 8],
        [0, 3, 6],
        [1, 4, 7],
        [2, 5, 8],
        [0, 4, 8],
        [2, 4, 6],
    ];
    for (let i = 0; i < lines.length; i++) {
        const [a, b, c] = lines[i];
        if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
            return {
                winner: squares[a],
                winnerPositions: lines[i],
            };
        }
    }
    if (squares.every(e => e !== null)) {
        return {
            winner: 'Nobody'
        };
    }
    return {
        winner: null
    };
}

ReactDOM.render(
    <Game />,
    document.getElementById('root')
);
