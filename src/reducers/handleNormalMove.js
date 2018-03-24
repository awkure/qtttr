//@flow 

import { whoseTurn } from '../core'

import { type State } from '../types'

export default function normalMove(state : State, i : *) {
    let quantumCells = state.quantumCells

    // TODO : Possible bug here
    let marker = whoseTurn(state) + state.turnNum

    if (quantumCells[i]) quantumCells[i].push(marker)
    else quantumCells[i] = [marker]

    if (!this.graph.hasNode(i)) this.graph.addNode(i)
    if (this.isSecondMove()) this.graph.addMorphism(state.lastMove || 0, i, marker)

    let cycleCells: *, cycleMarks: *, whoDecidesCollapse, status

    if (this.graph.isCyclic(i)) {
        [cycleCells, cycleMarks] = this.graph.getCycle(i)

        whoDecidesCollapse = this.notWhoseTurn()
        status = `A loop of entanglement has occured, choose the cell where to start the collapse`
    }

    state = { ...state
            , quantumCells
            , cycleCells
            , cycleMarks
            , status
            , turnNum    : state.subTurnNum + 1 === 4 ? state.turnNum + 1 : state.turnNum
            , subTurnNum : (state.subTurnNum + 1) % 4
            , lastMove   : i
            }

    if (whoDecidesCollapse !== undefined)
        return { ...state 
               , status : { [whoDecidesCollapse]: (status || '') + 'Click one of the cells involved in the loop'
                          , [this.opposite(whoDecidesCollapse)]: status
                          }
               }

    else if (this.isSecondMove())
        return { ...state
               , status : { [whoseTurn(state)]: 'Put the second mark to make quantum entanglement'
                          , [this.notWhoseTurn()]: `Player ${whoseTurn(state)}'s move.`
                          }
               }

    else
        return { ...state
               , status : { [whoseTurn(state)]: 'Put down a quantum move'
                          , [this.notWhoseTurn()]: `Now it's ${whoseTurn(state)}'s turn.`
                          }
               }
}
