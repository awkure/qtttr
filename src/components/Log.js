// @flow

import React from 'react'
import { type State } from '../types'

type Props = { status : string }

export default class Log extends React.Component<Props, State> {
	render () {
		return (<div className="game-info">
					<div className="status"> {this.props.status} </div>
				</div>);
	}
}

// const Log = (props : { status : string }) : React$Element<string> => {
// 	return (<div className="game-info">
// 				<div className="status">{props.status}</div>
// 			</div>)
// }

// export default Log