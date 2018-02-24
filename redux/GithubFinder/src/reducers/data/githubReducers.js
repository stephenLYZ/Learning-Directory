import { handleActions } from 'redux-actions'
import { GithubState } from '../../constants/models'

const githubReducers = handleActions({
  GET_GITHUB_SUCCESS: (state, { payload }) => (
    state.merge({
      data: payload.data,
    })
  ),
  CHAGE_USER_ID: (state, { payload }) => (
    state.merge({
      userId:
      payload.userId,
    })
  ),
}, GithubState)

export default githubReducers
