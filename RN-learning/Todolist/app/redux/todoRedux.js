const types = {
  ADD_ITEM: 'ADD_ITEM'
}

export const actionCreators = {
  addItem: (item) => {
    return {
      type: types.ADD_ITEM,
      payload: item
    }
  }
}

const initialState = {
  items: [],
}

export const reducer = (state = initialState, action) => {
  const {type, payload} = action

  switch(type) {
    default: {
      return state
    }
  }
}
