import { setToken, getToken, clearToken, tokenHasExpired } from '../api/Storage'

const types = {
  AUTHENTICATION_PENDING: 'AUTHENTICATION_PENDING',
  AUTHENTICATION_SUCCESS: 'AUTHENTICATION_SUCCESS',
  AUTHENTICATION_FAILURE: 'AUTHENTICATION_FAILURE'
}

const startAuthentication = () => async (dispatch, getState) => {
  let token = await getToken()
  let isTokenExpired = await tokenHasExpired()
  if(isTokenExpired) {
    clearToken()
  }
  if(token && !isTokenExpired) {
    return dispatch(authenticationSuccess(token))
  }

  return dispatch({
    type: types.AUTHENTICATION_PENDING
  })
}

const authenticationSuccess = () => async (token) => {
  setToken(token)
  return {
    type: types.AUTHENTICATION_SUCCESS,
    payload: {token}
  }
}

const authenticationFailure = () => async (error) => ({
  type: types.AUTHENTICATION_FAILURE,
  error: error
})

export const actionCreators = {
  startAuthentication,
  authenticationSuccess,
  authenticationFailure
}

const initialState = {
  isAuthenticating: false,
  token: null,
  error: null
}

export const reducer = (state = initialState, action) => {
  const { type, payload, error } = action

  switch(type) {
    case types.AUTHENTICATION_PENDING: {
      return {
        ...state,
        isAuthenticating: true,
        token: null,
        error: null
      }
    }
    case types.AUTHENTICATION_SUCCESS: {
      return {
        ...state,
        isAuthenticating: false,
        token: payload.token,
        error: null
      }
    }
    case types.AUTHENTICATION_FAILURE: {
      return {
        ...state,
        isAuthenticating: false,
        token: null,
        error: error
      }
    }
    default: {
      return state
    }
  }
}
