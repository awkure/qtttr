// @flow

import React, { Component } from 'react'

import Board from '../components/Board.js'
import Log   from '../components/Log.js'
import Core  from '../core'

import { type State , type ID } from '../types'

import '../style/app.css'

import { type Props } from '../types'

export default class App extends Component<Props, State> {
    game : *;

    constructor () {
        super()
        this.game  = new Core()
        this.state = { ...this.game.state, status : 'Turn: X'}
    }

    whoseTurn () : string {
        return (this.state.subTurnNum < 2) ? 'X' : 'Y'
    }

    isSecondMove () : boolean {
        return this.state.subTurnNum === 1 || this.state.subTurnNum === 3
    }

    setStatus (m : string) {
        this.setState({ status : m })
    }

    handleCellClick (i : ID) {
        let statuses = this.game.handleCellClick(i)
        let status   = statuses[this.whoseTurn()]

        this.setState(this.game.state)
        this.setState({ status })
    }

    // TODO : redux here 
    handleCyclicEntanglement (i : ID) {
        let statuses = this.game.handleCyclicEntanglement(i)
        let status : string = statuses[this.whoseTurn()]

        this.setState(this.game.state)
        this.setState({ status })
    }

    // TODO : redux here
    handleCollapse (mark : *) {
        // let statuses : * = this.game.handleCollapse(mark)
        // let status : string = statuses.status[this.whoseTurn()]
        let status : string = this.game.handleCollapse(mark).turn[this.whoseTurn()]

        // this.setState(this.game.state)
        // this.setState({ status })
    }

    render () {
        console.log(this.state);

        if(this.state.collapseCell != null)
            this.handleCollapse(this.state.quantumCells[this.state.collapseCell])

        return (
            <div>
                <div className="game">
                    <div className="game-board">
                        <Board
                            {...this.state}
                            onCellClick={(i : ID) => this.handleCellClick(i)}
                        />
                    </div>
                    <Log
                        {...this.state}
                        status={this.state.status}
                    />
                </div>
            </div>
        )
    }
}