import { AsyncStorage } from 'react-native'

const TOKEN_KEY = '@RedditClient:token'
const EXPIRATION_TIME = 30 * 60 * 100

const _isExpired = (time) => (
  (Date.now() - time) > EXPIRATION_TIME
)

const _getTokenInfo = async () => (
  await (
    AsyncStorage.getItem(TOKEN_KEY)
        .then((item) => JSON.parse(item))
  )
)

export const setToken = async (token) => (
  await AsyncStorage.setItem(
    TOKEN_KEY,
    JSON.stringify({
      token,
      expires: Date.now()
    })
  )
)

export const getToken = async () => (
  await (
    _getTokenInfo()
      .then((tokenInfo) => tokenInfo && tokenInfo.token)
  )
)

export const clearToken = async () => (
  await AsyncStorage.removeItem(TOKEN_KEY)
)

export const tokenHasExpired = async () => (
  await (
    _getTokenInfo()
      .then((tokenInfo) => tokenInfo && _isExpired(tokenInfo.expires))
  )
)
