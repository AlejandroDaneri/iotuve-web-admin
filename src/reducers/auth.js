const INITIAL_STATE = {
  authed: false
}

const auth = (state = INITIAL_STATE, action) => {
  const { type } = action
  switch (type) {
    case 'AUTH_SUCCESS': {
      return {
        authed: true
      }
    }
    case 'AUTH_LOGOUT': {
      return {
        authed: false
      }
    }
    default: {
      return state
    }
  }
}

export default auth
