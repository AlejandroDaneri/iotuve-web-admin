const INITIAL_STATE = {
  authed: false,
  token: ''
}

const auth = (state = INITIAL_STATE, action) => {
  const { type, payload } = action
  switch (type) {
    case 'AUTH_SUCCESS': {
      return {
        ...state,
        authed: true,
        token: payload.token
      }
    }
    case 'AUTH_LOGOUT': {
      return {
        ...state,
        authed: false
      }
    }
    default: {
      return state
    }
  }
}

export default auth
