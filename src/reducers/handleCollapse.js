// @flow 

import { type Mark
       , type ID
       , type State
       } from '../types'

import { calculateScores, getWinnerMsg, whoseTurn } from '../core'

import Graph from '../core/Graph'

export default function handleCollapse (state : State, mark: Mark, graph : Graph) : State {
    console.log(mark)
    let i = state.collapseCell
    let visited = new Set([mark])

    state = _handleCollapseHelper(state, mark, i, visited, graph)

    let scores = calculateScores(state.classicCells)

    let turn = { 'X' : 'Not winner'
               , 'Y' : 'Not winner'
               }

    if (scores) {
        turn = { 'X': getWinnerMsg(scores)
               , 'Y': getWinnerMsg(scores)
               }

        return { ...state 
               , gameOver     : true 
               , cycleCells   : null 
               , cycleMarks   : null 
               , collapseCell : null 
               , turn
               }

    } else {

        turn = { 'X': `Turn: ${whoseTurn(state)}`
               , 'Y': `Turn: ${whoseTurn(state)}`
               }

        return { ...state
               , cycleCells   : null
               , cycleMarks   : null
               , collapseCell : null 
               , turn 
               }
    }
}

function _handleCollapseHelper(state, mark: *, i: ID, visited: Set<*>, graph : Graph) {
    let classicCells = state.classicCells
    let quantumCells = state.quantumCells

    classicCells[i] = mark
    quantumCells[i] = null

    state = { ...state, classicCells, quantumCells }

    for (const morphism of graph.getNode(i).morphisms) {
        if (!visited.has(morphism.key)) {
            visited.add(morphism.key)
            state = _handleCollapseHelper(state, morphism.key, morphism.end.identity, visited, graph)
        }
    }

    return state
}