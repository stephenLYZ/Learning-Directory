import { fromJS } from 'immutable'
import { handleActions } from 'redux-actions'
import { CounterState } from '../constants/models'

import {
  INCREMENT_COUNT,
  DECREMENT_COUNT
} from '../constants/actionTypes'

const counterReducers = handleActions({
  INCREMENT_COUNT: (state) => (
    state.set(
      'count',
      state.get('count') + 1
    )
  ),
  DECREMENT_COUNT: (state) => (
    state.set(
      'count',
      state.get('count') - 1
    )
  )
},CounterState)

export default counterReducers
