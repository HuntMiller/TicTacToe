import React from 'react';

export function Square(props) {
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