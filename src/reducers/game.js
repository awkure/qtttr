// @flow

import { type State, type Action } from '../types'

import handleCollapse from './handleCollapse'
import handleCyclicEntanglement from './handleCyclicEntanglement'
import handleCellClick from './handleCellClick'

import { SET_STATUS
       , HANDLE_CELL_CLICK
       , HANDLE_CYCLIC_ENTANGLEMENT
       , HANDLE_COLLAPSE
       , GAME_OVER
       } from '../actions'

export const initState = 
{
    classicCells     : Array(9).fill(null),
    quantumCells     : Array(9).fill(null),
    turnNum          : 1,
    subTurnNum       : 0,
    cycleCells       : null,
    cycleMarks       : null,
    collapseCell     : [],
    gameOver         : false,
    lastMove         : null,
    status           : 'Memes',
    isBeingCollapsed : false,
    isHighlighted    : false,
    turn             : {}, 
    square           : null,
}

export const game = (state : State = initState, action: Action) => {
    switch (action.type) {
        case SET_STATUS:
            return { ...state, status : action.text }
        case HANDLE_CELL_CLICK:
            return handleCellClick(state, action.id)
        case HANDLE_CYCLIC_ENTANGLEMENT:
            return handleCyclicEntanglement(state)
        case HANDLE_COLLAPSE:
            return handleCollapse(state, action.mark, action.graph)
        default:
            return state
    }
}