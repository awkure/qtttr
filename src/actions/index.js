// @flow

import { type ID, type Action, type Mark } from '../types'

import Graph from '../core/Graph'

export const SET_STATUS = 'SET_STATUS'

export const HANDLE_CELL_CLICK = 'HANDLE_CELL_CLICK'

export const HANDLE_NORMAL_MOVE = 'HANDLE_NORMAL_MOVE'

export const HANDLE_CYCLIC_ENTANGLEMENT = 'HANDLE_CYCLIC_ENTANGLEMENT'

export const HANDLE_COLLAPSE = 'HANDLE_COLLAPSE'

export const GAME_OVER = 'GAME_OVER'

export function handleStatus (text : string) {
    return { type : SET_STATUS, text }
}

export function handleCellClick (id : ID) : Action {
    return { type : HANDLE_CELL_CLICK, id }
}

export function handleNormalMove (id : ID) : Action {
    return { type : HANDLE_NORMAL_MOVE, id }
}

export function handleCyclicEntanglement (id : ID) : Action {
    return { type : HANDLE_CYCLIC_ENTANGLEMENT, id }
}

export function handleCollapse (graph : Graph, mark : Mark) : Action {
    return { type : HANDLE_COLLAPSE, graph, mark }
}

export function gameOver () : Action {
    return { type : GAME_OVER }
}