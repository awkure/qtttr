// @flow

import * as React from 'react'

import Cell from '../containers/Cell'

import { type Props } from '../types'

const Square = (props : Props) : React$Element<*> => {
        return <Cell
            cMark={props.classicCells[props.square]}
            qMarks={props.quantumCells[props.square]}
            onClick={() => props.onCellClick(props.square)}
            isHighlighted={Boolean(props.cycleCells && props.cycleCells.includes(props.square))}
            isBeingCollapsed={props.collapseCell === props.square}
            {...props}
        />;
}

export default Square