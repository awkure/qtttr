// @flow

import Graph from './Graph.js'

import { type State , type ID , type Mark } from '../types'

import { initState, game } from '../reducers/game'

import { SET_STATUS
       , HANDLE_CELL_CLICK
       , HANDLE_NORMAL_MOVE 
       , HANDLE_COLLAPSE
       , HANDLE_CYCLIC_ENTANGLEMENT 
       } from '../actions/index.js';

export default class Core {
    graph : Graph = new Graph() 
    state : State
    X : string 
    Y : string 

    constructor (controller : *) {
        this.state = { ...initState
                     , ...controller
                     }
    }

    handleCellClick (id : ID) {
        return game( this.state 
                   , { type : HANDLE_CELL_CLICK 
                     , id 
                     }
                   )
    }

    handleNormalMove (id : ID) {
        return game( this.state
                   , { type : HANDLE_NORMAL_MOVE 
                     , id 
                     }
                   )
    }

    handleCyclicEntanglement (id : ID) {
        return game( this.state 
                   , { type : HANDLE_CYCLIC_ENTANGLEMENT 
                     , id 
                     }
                   )
    }

    handleCollapse (mark : Mark) {
        const graph = this.graph
        return game( this.state
                   , { type  : HANDLE_COLLAPSE 
                     , graph
                     , mark 
                     }
                   )
    }

    opposite (p : string) : string {
        return p === 'X' ? 'Y' : 'X'
    }

    notWhoseTurn () : string {
        return (this.state.subTurnNum < 2) ? 'Y' : 'X'
    }

    getPlayer (socketID : ID) : string {
        return this.X === socketID ? 'X' : 'Y'
    }

    isTurn (id : ID) : boolean /*%checks*/ {
        return whoseTurn(this.state) === 'X' ? this.X === id : this.Y === id
    }

    setStatus(text : string) {
        const state = this.state 
        return game( this.state 
                   , { type : SET_STATUS 
                     , text
                     }
                   )
    }

}

export function getWinnerMsg (scores : {[string] : number}) : string {
    let winner = scores['X'] > scores['Y'] ? 'X' : 'Y'
    let loser  = winner === 'X' ? 'Y' : 'X'

    if (scores['X'] + scores['Y'] === 1)
        return `${winner} wins`

    else if (scores['X'] === 1.5 || scores['Y'] === 1.5)
        return `${winner} wins with a double three-in-a-row.`

    else 
        return 'Draw'
}

function calculateWinners(cells) {
    const rows = [
      [0, 1, 2],
      [3, 4, 5],
      [6, 7, 8],
      [0, 3, 6],
      [1, 4, 7],
      [2, 5, 8],
      [0, 4, 8],
      [2, 4, 6],
    ]

    let winners = []
    for (let i = 0 ; i < rows.length ; ++i) {
        const [a, b, c] = rows[i]
        if ( cells[a] && cells[b] && cells[c] 
        &&   cells[a][0] === cells[b][0] 
        &&   cells[a][0] === cells[c][0] ){
            let subscripts = [cells[a][1], cells[b][1], cells[c][1]].map(Number)
            winners.push([ Math.max(...subscripts), cells[a][0], rows[i] ])
        }
    }
    return winners
}

export function calculateScores (cells : *) : ?{ [string] : number } {
    let winners = calculateWinners(cells)

    if (winners.length === 0)
        return null

    winners.sort()
    let scores = { 'X': 0, 'Y': 0 }

         if (winners.length >=  1) scores[winners[0][1]] += 1
    else if (winners.length >=  2) scores[winners[1][1]] += 0.5
    else if (winners.length === 3) scores[winners[2][1]] += 0.5

    return scores
}

export function whoseTurn (state : State) : string {
    return state.subTurnNum < 2 ? 'X' : 'Y'
}