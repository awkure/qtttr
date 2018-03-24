// @flow

import { whoseTurn } from '../core'

import { game } from './game'

import { type ID, type State } from '../types'
import { HANDLE_CYCLIC_ENTANGLEMENT, HANDLE_NORMAL_MOVE } from '../actions';

export default function handleCellClick(state : State, id : ID) {

    if (state.gameOver)
        return { 'X': 'Game over'
               , 'Y': 'Game over'
               }

    else if (state.cycleCells)
        return game( state 
                   , { type : HANDLE_CYCLIC_ENTANGLEMENT 
                     , id 
                     }
                   )

    else if (state.classicCells[id])
        return {
            [whoseTurn(state)]: 'Classical mark was already put in this cell'
        }

    else if (isSecondMove(state) && state.lastMove === id)
        return {
            [whoseTurn(state)]: 'Can\'t move twice in the same cell'
        }

    return game( state 
               , { type : HANDLE_NORMAL_MOVE 
                 , id 
                 }
               )
}

export function isSecondMove (state : State) : boolean /*%checks*/ {
    return state.subTurnNum === 1 || state.subTurnNum === 3
}