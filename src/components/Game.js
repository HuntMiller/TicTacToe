import React from 'react';
import {Board} from './Board';
import {calculateWinner} from '../index';

export class Game extends React.Component {
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