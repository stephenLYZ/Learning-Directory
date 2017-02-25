import RedditClient from '../api/RedditClient'

const types = {
  FETCH_POSTS_PENDING: 'FETCH_POSTS_PENDING',
  FETCH_POSTS_SUCCESS: 'FETCH_POSTS_SUCCESS',
  FETCH_POSTS_FAILURE: 'FETCH_POSTS_FAILURE'
}

const startFetchPosts = () =>
export const actionCreators = {
}

const initialState = {
  // setup your initialState
}


//implement your reducer
export const reducer = (state = initialState, action) => {
  const {type, payload} = action

  switch(type) {
    default: {
      return state
    }
  }
}
