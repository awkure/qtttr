// @flow

import * as React from 'react';

import Square from './Square'

import { type Props } from '../types'

const Board = (props : Props) : React$Element<string> => {
    let rows = []

    for (let row = 0 , squares = [] ; row < 3 ; ++row) {

        for (let square = row * 3 ; square < row * 3 + 3 ; ++square)
            squares.push(<Square square={square} {...props} />)
        
        rows.push(<div key={row} className="board-row">{squares}</div>)
        
        squares = []
    }
    
    return <div>{rows}</div>
}

export default Board