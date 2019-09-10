import React from 'react';
import {Square} from './Square';

export class Board extends React.Component {

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