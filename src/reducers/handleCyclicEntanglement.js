import { type State } from '../types'

export default function handleCyclicEntanglement (state : State, id : ID) {

        if (!state.cycleCells.includes(id))
            return { ...state 
                   , status : {
                       [this.whoseTurn()]: "Must pick square involved in cyclic entanglement! (is highlighted in blue)"
                     }
                   }

        return { ...state
               , collapseCell : id
               , status : { 
                    [this.whoseTurn()]: "Now, choose below which state you want to occupy the selected square." 
                 }
               }
}