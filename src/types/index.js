// @flow

import Graph from '../core/Graph'

export type ID = number

export type Mark = string

export type Cell = any

export type State = 
{
    classicCells     : Cell[];
    quantumCells     : Cell[];
    turnNum          : number  ;
    subTurnNum       : number  ;
    cycleCells       : *;
    cycleMarks       : *;
    collapseCell     : *;
    gameOver?        : bool;
    status           : string;
    turn             : {[string] : string};
    lastMove?        : *; 
    isHighlighted    : any;
    isBeingCollapsed : any;
    square           : any;
}

export type States = State[]

export type Props = 
{
    cMark?           : string;
    qMarks?          : Cell[];
    onClick?         : () => mixed;
    classicCells     : *;
    quantumCells     : *;
    onCellClick      : *;
    cycleCells       : *;
    cycleMarks       : *;
    collapseCell     : string[];
    isBeingCollapsed : *;
    square           : *;
    // onCellClick : any;
    // choices : any;
    // status : any;
    // onChoiceClick : any;
}

export type Action = 
| {| type : 'SET_STATUS', +text : string |}
| {| type : 'HANDLE_CELL_CLICK', +id : ID |}
| {| type : 'HANDLE_NORMAL_MOVE', +id : ID |}
| {| type : 'HANDLE_CYCLIC_ENTANGLEMENT', +id : ID |}
| {| type : 'HANDLE_COLLAPSE', graph : Graph, mark : Mark |}
| {| type : 'GAME_OVER' |}