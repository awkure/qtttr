import { combineReducers } from 'redux'

import { SET_STATUS } from './actions'

import { game } from './game'

export default combineReducers({game})