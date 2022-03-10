export const jsonReducer = (state = null,action) => {
  switch(action.type) {
    case 'JSON':
      return {...state,...action.payload}
    default:
      return state
  }
}

